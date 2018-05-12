/* globals $r */
/* eslint no-console: 0 */

import { allRDFValues, defaultNS as NS } from 'link-lib';
import {
  LinkedResourceContainer,
  getLinkedObjectClass,
} from 'link-redux';
import rdf from 'rdflib';

function tryShorten(iri) {
  if (iri.startsWith(':')) {
    return `new BlankNode('${iri.slice(1)}')`;
  }
  const shortMap = Object
    .keys(NS)
    .map(ns => ({ [NS[ns]().value]: ns }))
    .reduce((a, b) => Object.assign(a, b));

  const entries = Object.entries(shortMap);

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if (iri.includes(key)) {
      return `NS.${value}('${iri.split(key)[1]}')`;
    }
  }

  return `new NamedNode('${iri}')`;
}

export function parseTerm(type, value) {
  if (type.termType === 'BlankNode') {
    return `new BlankNode('${value.slice(1)}')`;
  }
  if (type.termType === 'NamedNode') {
    return tryShorten(value);
  }
  let castValue, constructor;
  switch (type.datatype && type.datatype.value) {
    case NS.xsd('boolean').value:
      castValue = value === 'true';
      constructor = 'Literal.fromBoolean';
      break;
    case NS.xsd('dateTime').value:
      castValue = `new Date('${value}')`;
      constructor = 'Literal.fromDate';
      break;
    case NS.xsd('decimal').value:
    case NS.xsd('float').value:
      castValue = Number.parseFloat(value);
      constructor = 'Literal.fromNumber';
      break;
    case NS.xsd('double').value:
    case NS.xsd('integer').value:
      castValue = Number.parseInt(value, 10);
      constructor = 'Literal.fromNumber';
      break;
    default:
      castValue = value.includes('\'') ? `"${value}"` : `'${value}'`;
      constructor = 'new Literal';
  }

  return `${constructor}(${castValue})`;
}

export class LinkDevTools {
  constructor(reactDevTools, globalName = 'dev') {
    this.rDevTools = reactDevTools;
    this.globalName = globalName;
  }

  get $r() {
    if (typeof $r !== 'undefined') {
      return $r;
    }
    return this.rDevTools;
  }

  /**
   * Get the LRS bound to the component.
   * @param {React.Element} comp Component to get the LRS from.
   * @return {LinkedRenderStore|undefined} Resolved LinkedRenderStore if any.
   */
  getLRS(comp = this.$r) {
    const lrs = comp && comp.context && comp.context.linkedRenderStore;
    if (typeof lrs === 'undefined') {
      console.warn('Component `linkedRenderStore` is undefined, recovering by using global (you should still fix this)');
    }
    return lrs || window.LRS;
  }

  static returnWithError(msg = undefined) {
    return console.error(`${msg ? `${msg}, i` : 'I'}s a link component selected? (check the value of \`$r\`)`);
  }

  dataArr(comp = this.$r) {
    const lrs = this.getLRS(comp);
    if (typeof comp === 'undefined') {
      return console.error('No component selected in react devtools (check the value of `$r`)');
    }
    if (typeof comp.props === 'undefined') {
      return LinkDevTools.returnWithError('Object has no props');
    }
    let subject = comp.props.object || comp.props.subject;
    if (typeof subject === 'undefined') {
      return LinkDevTools.returnWithError('No subject or object found (check the value of `$r`)');
    }
    if (typeof subject === 'string') {
      console.debug('Normalizing passed subject into NamedNode');
      subject = new rdf.NamedNode(subject);
    }
    return lrs.tryEntity(subject);
  }

  showProp(func) {
    return (comp = this.$r) => {
      if (typeof comp === 'undefined') {
        return console.error('No component selected in react devtools (check the value of `$r`)');
      }
      if (typeof comp.props === 'undefined') {
        return LinkDevTools.returnWithError('Object has no props');
      }
      if (typeof comp.props.label === 'undefined') {
        return LinkDevTools.returnWithError('Component `label` is undefined');
      }
      if (typeof comp.props.subject === 'undefined') {
        return LinkDevTools.returnWithError('Component `subject` is undefined');
      }
      const lrs = this.getLRS(comp);

      console.debug('Using: ', comp.props.label, comp.props.subject, lrs ? 'local LRS' : 'global LRS');
      return func(comp.props.subject, comp.props.label);
    };
  }

  toObject(arr = this.dataArr, denormalize = true) {
    if (!Array.isArray(arr)) {
      return console.error('Pass an array of statements to process');
    }
    if (arr.length === 0) {
      console.debug('No statements passed');
      return {};
    }
    const obj = {};
    for (let i = 0; i < arr.length; i++) {
      const cur = arr[i];
      const subj = cur.subject.toString();
      const pred = cur.predicate.toString();
      if (typeof obj[subj] === 'undefined') {
        obj[subj] = {};
      }
      if (typeof obj[subj][pred] === 'undefined') {
        obj[subj][pred] = cur.object;
      } else if (Array.isArray(obj[subj][pred])) {
        obj[subj][pred].push(cur.object);
      } else {
        obj[subj][pred] = [
          obj[subj][pred],
          cur.object,
        ];
      }
    }
    const allKeys = Object.keys(obj);
    if (denormalize && allKeys.length === 1) {
      console.debug('Returning single subject;', allKeys[0]);
      return obj[allKeys[0]];
    }
    return obj;
  }

  /**
   * Resolves a Blank/NamedNode to an NS shortened version, or its constructor call if not resolved.
   * @param {String} iri URL string to resolve.
   * @return {String} Valid JS syntax string to create the Blank/NamedNode reference.
   */
  static tryShorten(iri) {
    return tryShorten(iri);
  }

  snapshotNode(subject, comp) {
    const data = this.toObject(this.dataArr(comp), false);
    return Object.keys(data).map((s) => {
      const sVal = s.slice(1, -1);
      const attrs = Object.keys(data[s]).map((attrKey) => {
        const attrObj = data[s][attrKey];
        const predicate = attrKey.slice(1, -1);
        const toNode = object => `    [${LinkDevTools.tryShorten(predicate)}]: ${object},`;
        if (Array.isArray(attrObj)) {
          const attrType = attrObj[0];
          return toNode(`[\n${attrObj.map(v => `      ${parseTerm(attrType, v.value)}`).join(',\n')},\n    ]`);
        }
        return toNode(parseTerm(attrObj, attrObj.value));
      });
      const keyVal = sVal === subject ? 'subject' : LinkDevTools.tryShorten(sVal);
      return (
        `[${keyVal}]: {\n${attrs.join('\n')}\n  },`
      );
    });
  }

  snapshotTraverse(subject, maxDepth, startComp) {
    const innerTraverse = (depth, comp) => {
      let resources = [];
      if (depth > maxDepth) {
        console.debug('Maximum stack depth reached');
        return resources;
      }
      if (comp !== undefined && comp !== null) {
        if (comp.type && comp.type.name === 'LinkedResourceContainer') {
          resources = this.snapshotNode(subject, comp.stateNode);
        }
        resources = resources.concat(innerTraverse(depth + 1, comp.child));
        resources = resources.concat(innerTraverse(depth + 1, comp.sibling));
      }
      return resources;
    };
    return innerTraverse(0, startComp);
  }

  snapshot(traverse = 100) {
    const comp = this.$r;
    const subject = comp.props.object;

    let resources = this.snapshotNode(subject, comp);

    if (typeof traverse !== 'undefined' && traverse > 0) {
      const startChild = comp._reactInternalFiber.child; // eslint-disable-line no-underscore-dangle
      resources = resources.concat(this.snapshotTraverse(subject, traverse, startChild));
    }

    return (
      `const subject = new NamedNode('${subject}');
  
  const resources = {
    ${resources.join('\n')}
  };\n`
    );
  }

  get data() {
    return this.toObject(this.dataArr());
  }
  get getPropArr() {
    return this.showProp(this.getLinkedObjectProperty);
  }
  get getPropRawArr() {
    return this.showProp(this.getLinkedObjectPropertyRaw);
  }
  get getProp() {
    const propVal = this.getPropArr;
    return Array.isArray(propVal) ? this.toObject(propVal) : propVal;
  }
  get getPropRaw() {
    const propVal = this.getPropRawArr;
    return Array.isArray(propVal) ? this.toObject(propVal) : propVal;
  }

  // eslint-disable-next-line class-methods-use-this
  get rdf() {
    return rdf;
  }

  get reload() {
    if (this.$r && this.$r.props) {
      if (!this.$r.props.reloadLinkedObject) {
        return console.warn("Selected node doesn't seem to be a LOC");
      }
      return this.$r.props.reloadLinkedObject();
    }
    return console.warn('No node or wrong node type selected.');
  }

  get topology() {
    return this.$r.props.topology === null
      ? undefined
      : (this.$r.props.topology || this.$r.context.topology);
  }

  get propertyRenderers() {
    return this.getLRS(this.$r).mapping;
  }

  get typeRenderers() {
    return this.getLRS(this.$r).mapping['<http://purl.org/link-lib/typeRenderClass>'];
  }

  explainLOC(comp, lrs) {
    console.info('Component seems an LOC');
    console.debug(`(get all known type renderers through \`${this.globalName}.typeRenderers\`)`);
    if (comp.props.forceRender) {
      if (comp.props.children) {
        return console.info('forceRender was used with children; rendering a div containing the children.');
      }
      console.debug('Detected forceRender, but no children were given, continuing.');
    }
    const compData = comp.data();
    if (LinkedResourceContainer.isLoading(comp.props.subject)) {
      const cause = compData === 'undefined' ? 'Component has no data' : 'Component has too little data';
      console.info(cause);
      console.debug('Resolved data;', compData);
      if (comp.onLoad()) {
        console.info('Loading component was resolved and will be rendered');
        return console.debug('Resolved loading component;', comp.onLoad());
      }
      return console.info('No loading component was resolved; rendering `null`');
    }
    const err = comp.state.hasCaughtError ||
      LinkedResourceContainer.hasErrors(lrs.api.getStatus(comp.subject()));
    if (err) {
      console.info('The object is in error state');
      console.debug(this.getPropArr(NS.http('statusCodeValue')));
      if (comp.onError()) {
        console.info('An error component was resolved; rendering the error component');
        return console.debug('Resolved error component;', comp.onError());
      }
      return console.info('No error component was resolved; rendering `null`');
    }
    if (comp.props.children) {
      return console.info('Children were passed to the component, rendering a div containing the children.');
    }
    const ownObjType = allRDFValues(compData, lrs.namespaces.rdf('type'));
    if (!ownObjType) {
      console.debug("Resolved data doesn't contain a type");
    }
    const lrsDefaultType = lrs.defaultType;
    if (!lrsDefaultType) {
      console.debug('No default type in LRS.');
    }
    if (!(ownObjType && lrsDefaultType)) {
      return console.info('Default type not present and no type could be resolved, rendering null.');
    }
    const typeMsg = ownObjType ? 'Continuing with type from data.' : 'Continuing with default type.';
    console.debug(typeMsg, ownObjType || lrsDefaultType);

    const renderClass = lrs.resourceComponent(comp.props.subject, comp.topology());
    console.debug('Requesting class from LRS with topology', comp.topology());
    if (!renderClass) {
      return console.info('No class could be found, rendering no-view div.');
    }
    console.info('Render class was resolved, rendering class with own props.');
    console.debug('Resolved class: ', renderClass);
    return console.debug('Given props: ', comp.props);
  }

  explainProperty(comp, lrs) {
    console.info('Component seems a property renderer');
    console.debug(`(get all known property renderers through \`${this.globalName}.propertyRenderers\`)`);
    const val = comp.props.linkedProp || this.getProp;
    if (comp.props.linkedProp) {
      console.info('Component has a `linkedProp` property. Property value from linkedProp will be used');
    } else {
      console.info('No `linkedProp` is given. Property value will be retrieved from the render store');
    }
    if (typeof val === 'undefined') {
      console.info('The value of the property is `undefined`');
      console.info(`\`forceRender\` prop is ${comp.props.forceRender === true ? 'enabled' : 'disabled'}.`);
      if (!comp.props.forceRender) {
        return console.info("Value is undefined and rendering isn't forced; rendering `null`");
      }
      console.info('Continuing render without a value present');
    }
    console.debug('Found value:', val);
    console.debug(
      'Component lookup will be done with: ',
      allRDFValues(lrs.tryEntity(comp.props.subject), NS.rdf('type')),
      lrs.expandProperty(comp.props.label),
      this.topology
    );
    const propOrconnectedPropCtx = comp.context.linkedRenderStore
      ? comp.context
      : comp.__reactInternalMemoizedUnmaskedChildContext;// eslint-disable-line no-underscore-dangle
    const klass = getLinkedObjectClass(comp.props, propOrconnectedPropCtx);
    if (typeof klass !== 'undefined') {
      console.info(`Component will be rendered with matched class '${klass.name}'`);
      return console.debug('Matched component class reference:', klass);
    }
    console.info('No render class was found (is the property renderer registered?)');
    if (typeof val !== 'undefined') {
      if (val.termType === 'NamedNode') {
        return console.info('Value is an IRI; defaulting to rendering an LOC with object', val.value);
      }
      if (typeof klass === 'undefined') {
        return console.info('Neither the value nor the property renderer is present, but forceRender was given; rendering `null`');
      }
    }
    return console.info('Value is present, but no class could be found; rendering a div with the value');
  }

  get explain() {
    const comp = this.$r;
    const lrs = this.getLRS(comp);
    if (typeof comp.constructor === 'undefined') LinkDevTools.returnWithError();
    const { displayName, name } = comp.constructor;
    console.group(`Explanation for component ${name}`);
    if (name.startsWith('LinkedResourceContainer')) {
      this.explainLOC(comp, lrs);
    } else if (name.startsWith('Property') || displayName.startsWith('ConnectedProp')) {
      this.explainProperty(comp, lrs);
    } else {
      console.warn(`Component seems of unknown type (${name})`);
    }
    return console.groupEnd();
  }

  get help() {
    function helpTableObj(method, desc) {
      return {
        desc,
        method,
      };
    }

    console.warn('__DO NOT__ USE THESE METHODS IN CODE SINCE ARE NOT PUBLIC, AND ARE FOR DEBUGGING PURPOSES ONLY.');
    console.group('Available object methods for LinkedResourceContainer');
    const LOC = [
      helpTableObj('<<static>> hasData', 'Returns whether the resource is considered to have data'),
      helpTableObj('<<static>> hasErrors', 'Returns whether the resource is considered to be in an error state'),
      helpTableObj('onError', 'Returns the component to render on error'),
      helpTableObj('onLoad', 'Returns the component to render on load'),
      helpTableObj('data', 'Returns the currently available data (real-time, so render-time data theoretically might differ).'),
      helpTableObj('objType', 'Returns the resolved type of the resource, defaults to the lrs value.'),
      helpTableObj('subject', 'Returns the normalized subject of the container'),
      helpTableObj('topology', 'Returns the current topology (or undefined when not present)'),
    ];
    console.table(LOC, ['method', 'desc']);
    console.groupEnd();
    console.info('Property and others are purely functional, so this module exposes additional methods which can be used to inspect those components');
    console.group(`Available object methods for devTools (via \`${this.globalName}.<attribute>\`)`);
    console.info('Most methods work on react-devtools object references (using value of `$r`)');
    const devTools = [
      helpTableObj('hasData', 'Returns whether the resource is considered to have data'),
      helpTableObj('data', 'Returns the currently available data as an object (real-time, so render-time data theoretically might differ).'),
      helpTableObj('dataArr', 'Returns the raw currently available data (See also; `data`).'),
      helpTableObj('explain', 'Renders the sequence of decisions made by the component for rendering'),
      helpTableObj('getLinkedObjectProperty()', "Exposes link-redux's `getLinkedObjectProperty` method (used by `Property` and `PropertyBase`)."),
      helpTableObj('getLinkedObjectPropertyRaw()', "Exposes link-redux's `getLinkedObjectProperty` method (used by `Property` and `PropertyBase`)."),
      helpTableObj('getPropArr', "Returns the component's 'object property' without using `toObject`."),
      helpTableObj('getPropRawArr', "Returns the component's 'object property' without using `toObject`."),
      helpTableObj('getProp', "Returns the component's formatted 'object property' by using `getLinkedObjectProperty`."),
      helpTableObj('getPropRaw', "Returns the component's formatted 'object property' by using `getLinkedObjectPropertyRaw`."),
      helpTableObj('help', 'Displays this help message.'),
      helpTableObj('reload', 'Reloads the currently selected LOC (if possible).'),
      helpTableObj('snapshot(n)', "Returns JS-formatted data for snapshot testing `n` LOC's deep."),
      helpTableObj('toObject(arr)', 'Converts an array of statements to an object.'),
      helpTableObj('topology', "Returns the current location's topology."),
      helpTableObj('types', ''),
      helpTableObj('typeRenderers', 'Returns all registered type renderers.'),
      helpTableObj('propertyRenderers', 'Returns all registered property renderers (including type renderers).'),
    ];
    console.table(devTools, ['method', 'desc']);
    console.groupEnd();
    return undefined;
  }

  getLinkedObjectProperty(property, subject, linkedRenderStore) {
    return (linkedRenderStore || this.getLRS()).getResourceProperty(
      property,
      subject
    );
  }

  getLinkedObjectPropertyRaw(subject, property, linkedRenderStore) {
    return (linkedRenderStore || this.getLRS()).getResourcePropertyRaw(
      subject,
      property
    );
  }
}
