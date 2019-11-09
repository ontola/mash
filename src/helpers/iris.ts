import rdfFactory, {
  isBlankNode,
  isNamedNode,
  isTerm,
  NamedNode,
  Namespace,
  Node,
  PlainFactory,
  SomeTerm,
} from "@ontologies/core";
import { Location } from "history";
import { defaultNS as NS, SomeNode } from "link-lib";
import { LinkReduxLRSType } from "link-redux";

import dbp from "../ontology/dbp";
import dbpedia from "../ontology/dbpedia";
import dbpediaData from "../ontology/dbpediaData";
import { FRONTEND_URL } from "./config";
import { termFromNQ } from "./data";

export type IRIParams<T> = Record<keyof T, SomeTerm | string>;

export interface ParsedAction<ParamMap extends IRIParams<ParamMap> = {}> {
  action: NamedNode;
  base: NamedNode;
  params: Partial<ParamMap>;
}

export type BoundActionDispatcher<ParamMap extends IRIParams<ParamMap> = {}> =
  (action: string, payload?: Partial<ParamMap>) => Promise<any>;

const factory = new PlainFactory();

/**
 * Generate a path?query combination for the given {action} and {payload}.
 *
 * @see {createActionIRI}
 * @see {createActionPair}
 *
 * @param action The path of the action.
 * @param payload
 */
export function actionIRI<ParamMap extends IRIParams<ParamMap> = {}>(
  action: string,
  payload?: Partial<ParamMap>,
): string {

  const query = Object
    .entries<string | SomeTerm>(payload)
    .map<[string, string]>(([k, v]) => [
      k,
      encodeURIComponent(isTerm(v) ? factory.toNQ(v) : v),
    ]);

  return `${action}?${new URLSearchParams(query).toString()}`;
}

/**
 * Create an action generator to easy in IRI generation.
 *
 * @see {actionIRI}
 * @see {createActionPair}
 * @param base - The base Namespace to which the action/payload is added.
 */
export const createActionIRI = <ParamMap extends IRIParams<ParamMap> = {}>(base: Namespace) =>
  (action: string, payload?: Partial<ParamMap>) =>
    base(actionIRI<ParamMap>(action, payload));

/**
 * Create a action creator with the store and namespace already bound.
 *
 * @param base - The namespace to which the action name should be appended.
 * @param store - The store where the action should be dispatched.
 *
 * @see {createActionPair}
 *
 * @example
 *   const dispatch = createActionIRI(store, myNamespace);
 *   store.actions.example = {
 *     initialize: (iri: NamedNode) => dispatch('initialize', { iri })
 *   };
 */
export const createActionNS = <ParamMap extends IRIParams<ParamMap> = {}>(base: Namespace, store: LinkReduxLRSType):
  BoundActionDispatcher<ParamMap> => {
  const actionNS = createActionIRI<ParamMap>(base);

  return (action, payload?: Partial<ParamMap>) => store.exec(actionNS(action, payload));
};

/**
 * Create a dispatch-parse pair for use in middleware.
 *
 * @param base - The namespace to create actions on.
 * @param store - The store to dispatch actions on.
 */
export const createActionPair = <ParamMap extends IRIParams<ParamMap>>(base: Namespace, store: LinkReduxLRSType) => ({
  dispatch: createActionNS<ParamMap>(base, store),
  parse: (action: NamedNode) => parseAction<ParamMap>(action),
});

/**
 * Get the IRI which the browser will fetch (the document).
 *
 * Effectively the IRI without the fragment.
 */
export function doc(iri: NamedNode): NamedNode {
  const url = new URL(iri.value);
  url.hash = "";

  return rdfFactory.namedNode(url.toString());
}

/**
 * Get the filename (with extension) from an IRI.
 *
 * @param iri - The IRI to get the filename from.
 * @param folder - The base folder to trim. Will be guessed if omitted.
 * @returns The filename with extension or an empty string if it has no filename.
 */
export function filename(iri: NamedNode, folder?: NamedNode): string {
  if (typeof folder === "undefined") {
    const url = new URL(iri.value);
    folder = rdfFactory.namedNode(`${url.origin}${url.pathname.split("/").slice(0, -1).join("/")}`);
  }
  let file = iri.value.replace(folder.value, "");
  // There is some issue in redirection or parsing where paths without trailing slash will cause
  // the embedded files to be root-relative IRI's.
  if (file.includes("://")) {
    file = iri.value.replace(site(folder).value, "");
  }

  return file;
}

/**
 * Get the origin of the {iri} without trailing slash
 */
export function origin(iri: NamedNode): NamedNode {
  return rdfFactory.namedNode(new URL(iri.value).origin);
}

/**
 * Get the IRI of the directory containing {iri} or its parent if {iri} has a trailing slash.
 */
export function parentDir(iri: NamedNode): NamedNode {
  const url = new URL(iri.value);
  const endIndex = url.pathname.endsWith("/") ? -2 : -1;
  url.pathname = url.pathname.split("/").slice(0, endIndex).join("/");

  return rdfFactory.namedNode(url.toString());
}

/**
 * Parse an action for its base IRI and parameters separated.
 *
 * Only the last value of each param is included, so duplicates are omitted.
 *
 * The param values are parsed and converted for n-quads syntax, otherwise their literal value is
 * used. The resulting {return.params} is not guaranteed to be correct with the given {ParamMap}, it
 * is for typing purposes only.
 */
export const parseAction = <ParamMap extends IRIParams<ParamMap> = {}>(action: NamedNode):
  ParsedAction<ParamMap> => {

  const url = new URL(action.value);
  const params = {};
  url.searchParams.forEach((value: string, key: string) => {
    const parsedValue = termFromNQ(value);
    params[key] = parsedValue || value;
  });

  url.search = "";

  return {
    action,
    base: rdfFactory.namedNode(url.toString()),
    params: params as Partial<ParamMap>,
  };
};

/**
 * Get the origin of the {iri} with trailing slash
 */
export function site(iri: NamedNode): NamedNode {
  return rdfFactory.namedNode(`${origin(iri).value}/`);
}

/* Mash specific functions */

export function dbpediaToWikiQuery(base, iri: NamedNode | string): string {
  if (!iri || typeof iri !== "string" && !isNamedNode(iri)) {
    return "";
  }

  return (typeof iri === "string" ? iri : iri.value)
    .replace(base, "")
    .replace(/_/g, " ");
}

function resourceIRIToIRL(iri: string) {
  const dataIRI = new URL(iri);
  switch (dataIRI.host) {
    case "www.wikidata.org":
      const id = dataIRI.pathname.split("/").pop();
      return rdfFactory.namedNode(`https://www.wikidata.org/wiki/Special:EntityData/${id}.n3`);
    default:
      return rdfFactory.namedNode(`${iri}.n3`);
  }
}

/**
 * Generate a path?query combination for the given {action} and {payload}. The subject will be
 *
 * @param subject
 * @param action
 * @param payload
 */
export function subjectActionIRI(subject: Node, action: string, payload: { [k: string]: string } = {}): string {
  const query = [
    subject && `iri=${subject.value}`,
    ...Object.entries<string>(payload).map(([k, v]) => [k, encodeURIComponent(v)].join("=")),
  ].filter(Boolean).join("&");

  return `${action}?${query}`;
}

export function articleToWikiIRISet(article: Location) {
  if (article.pathname.startsWith("/resource")) {
    const iri = rdfFactory.namedNode(decodeURIComponent(new URLSearchParams(article.search).get("iri")));
    return {
      data: resourceIRIToIRL(iri.value),
      iri,
      page: iri,
    };
  }

  const dbpediaSafeArticle = article.pathname.split("/").pop().trim().replace(/\s/g, "_");
  if (dbpediaSafeArticle) {
    return {
      data: dbpediaData.ns(`${dbpediaSafeArticle}.n3`),
      iri: dbpedia.ns(dbpediaSafeArticle),
      page: rdfFactory.namedNode(`http://dbpedia.org/page/${dbpediaSafeArticle}`),
    };
  }

  return {
    data: undefined,
    iri: undefined,
    page: undefined,
  };
}

export function resourceToWikiPath(iri: SomeNode | string, linkTemplate?: any): string {
  if (!iri) {
    return "";
  }

  const strIRI = typeof iri === "string" ? iri : iri.value;

  let prefix = "wiki";
  let base = dbpedia.ns("").value;
  if (isBlankNode(iri) || strIRI.startsWith("_:")) {
    throw Error("Blank node passed to resourceToWikiPath");
    // } else if (strIRI.startsWith(dbo.ns("").value)) {
    //     prefix = "ontology";
    //     base = dbo.ns("").value;
  } else if (strIRI.startsWith(dbp.ns("").value)) {
    prefix = "property";
    base = dbp.ns("").value;
  } else if (linkTemplate) {
    const u = new URL(strIRI);
    const feUrl = new URL(FRONTEND_URL);
    const needsDoubleSlash = u.href.startsWith(`${u.protocol}//`);

    return linkTemplate.expand({
      browserOrigin: feUrl.origin,
      browserPathname: feUrl.pathname,

      iriHash: u.hash,
      iriHost: u.host,
      iriHref: u.href,
      iriPathname: u.pathname,
      iriProtocol: `${u.protocol}${needsDoubleSlash ? "//" : ""}`,
      iriSearch: u.search,
    });
  } else {
    return `/resource/page?iri=${encodeURIComponent(strIRI)}`;
  }

  const article = dbpediaToWikiQuery(base, iri as NamedNode);

  return `/${prefix}/${article}`;
}

export function tryShorten(iri: NamedNode): string {
  if (iri.value.startsWith(":")) {
    return factory.toNQ(iri);
  }
  const shortMap = Object
    .keys(NS)
    .map((ns) => ({ [NS[ns]("").value]: ns }))
    .reduce((a, b) => Object.assign(a, b));

  const entries = Object.entries(shortMap);

  for (const [key, value] of entries) {
    if (iri.value.includes(key)) {
      return `${value}:${iri.value.split(key)[1]}`;
    }
  }

  return (iri as any).term || factory.toNQ(iri);
}
