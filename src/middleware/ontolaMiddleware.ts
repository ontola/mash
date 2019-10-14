/**
 * Copyright 2019
 * Argu B.V.
 */
import rdfFactory from "@ontologies/core";
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
} from "link-lib";
import { LinkReduxLRSType } from "link-redux";
import {
  BlankNode,
  Collection,
  Literal,
  NamedNode,
  Namespace,
  Statement,
} from "rdflib";
import { ElementType } from "react";

import { History } from "../helpers/history";
import ns from "../ns";

export const ontolaMiddleware = (history: History): MiddlewareFn<ElementType> =>
  (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.ontola = {};

  const ontola = Namespace("https://ns.ontola.io/");
  // eslint-disable-next-line no-param-reassign
  store.namespaces.ontola = ontola;

  const ontolaActionPrefix = store.namespaces.ontola("actions/").value;

  const currentPath = (): string => {
    const l = history.location;
    return [
      [l.pathname, l.search].filter(Boolean).join(""),
      l.hash,
    ].filter(Boolean).join("#");
  };

  /**
   * Ontola snackbar setup
   */

  const snackbarQueue = new Collection();

  store.processDelta([
    rdfFactory.quad(
      ontola("snackbar/manager"),
      ns.rdf.type,
      ontola("snackbar/Manager"),
      store.namespaces.ll("add"),
    ),
    rdfFactory.quad(
      ontola("snackbar/manager"),
      ontola("snackbar/queue"),
      snackbarQueue as Literal,
      store.namespaces.ll("add"),
    ),
  ], true);

  const queueSnackbar = (text: string) => {
    const s = new BlankNode();

    const queue = store.getResourceProperty(ontola("snackbar/manager"), ontola("snackbar/queue"));

    return [
      rdfFactory.quad(
        s,
        store.namespaces.rdf("type"),
        ontola("snackbar/Snackbar"),
        store.namespaces.ll("add"),
      ),
      rdfFactory.quad(
        s,
        store.namespaces.schema("text"),
        Literal.fromValue(text),
        store.namespaces.ll("add"),
      ),
      rdfFactory.quad(
        ontola("snackbar/manager"),
        ontola("snackbar/queue"),
        // @ts-ignore
        Collection.fromValue([...queue.elements, s]),
        store.namespaces.ll("replace"),
      ),
    ];
  };

  const shiftSnackbar = () => {
    const queue = store.getResourceProperty(ontola("snackbar/manager"), ontola("snackbar/queue")) as Collection;
    queue.shift();

    return [
      rdfFactory.quad(
        ontola("snackbar/manager"),
        ontola("snackbar/queue"),
        // @ts-ignore
        Collection.fromValue(queue.elements),
        store.namespaces.ll("replace"),
      ),
    ];
  };

  (store as any).actions.ontola.showSnackbar = (message: Literal | string) => {
    store.exec(store.namespaces.ontola(`actions/snackbar?text=${encodeURIComponent(message.toString())}`));
  };

  /**
   * Ontola dialog setup
   */

  const dialogManager = ontola("dialog/manager");

  store.processDelta([
    rdfFactory.quad(
      dialogManager,
      store.namespaces.rdf("type"),
      ontola("dialog/Manager"),
      store.namespaces.ll("add"),
    ),
  ], true);

  const hideDialog = () => [
    rdfFactory.quad(
      dialogManager,
      ontola("dialog/resource"),
      ontola("dialog/rm"),
      store.namespaces.ll("remove"),
    ),
  ];

  const showDialog = (value: string) => [
    rdfFactory.quad(
      dialogManager,
      ontola("dialog/resource"),
      rdfFactory.namedNode(value),
      store.namespaces.ll("replace"),
    ),
    rdfFactory.quad(
      dialogManager,
      ontola("dialog/opener"),
      store.namespaces.app(currentPath().slice(1)),
      store.namespaces.ll("replace"),
    ),
  ];

  (store as any).actions.ontola.showDialog = (resource: NamedNode) => {
    store.exec(store.namespaces.ontola(`actions/dialog/alert?resource=${encodeURIComponent(resource.value)}`));
  };

  (store as any).actions.ontola.navigate = (resource: NamedNode) => {
    store.exec(store.namespaces.ontola(`actions/dialog/redirect?location=${encodeURIComponent(resource.value)}`));
  };

  /**
   * Miscellaneous
   */

  history.listen((_, action) => {
    if (["POP", "PUSH"].includes(action)) {
      store.exec(ontola(`actions/navigation/${action.toLowerCase()}`));
    }
  });

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (!iri.value.startsWith(ontolaActionPrefix)) {
      return next(iri, opts);
    }

    switch (iri) {
      case ontola(`actions/navigation/push`):
      case ontola(`actions/navigation/pop`):
        const dialog = store.getResourceProperty(dialogManager, ontola("dialog/resource"));
        if (dialog) {
          store.exec(ontola("actions/dialog/close"));
        }
        return next(iri, opts);
      default:
    }

    if (iri === store.namespaces.ontola("actions/dialog/close")) {
      store.processDelta(hideDialog(), true);
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola("actions/dialog/alert").value)) {
      const resource = new URL(iri.value).searchParams.get("resource");

      history.push(currentPath());
      if (!resource) {
        throw new Error("Argument 'value' was missing.");
      }
      store.processDelta(showDialog(resource), true);

      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola("actions/snackbar/finished").value)) {
      store.processDelta(shiftSnackbar(), true);
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola("actions/snackbar").value)) {
      const value = new URL(iri.value).searchParams.get("text");
      if (!value) {
        throw new Error("Argument 'value' was missing.");
      }
      store.processDelta(queueSnackbar(value), true);

      return Promise.resolve();
    }

    return next(iri, opts);
  };
};
