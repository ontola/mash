import { createStore } from "link-lib";
import { Fetcher, Namespace } from "rdflib";
import { ReactType } from "react";

import { FRONTEND_URL } from "./helpers/config";
import { LinkDevTools } from "./helpers/LinkDevTools";
import { middleware } from "./middleware";

(Fetcher as any).crossSiteProxyTemplate = `${FRONTEND_URL}proxy?iri={uri}`;

// @ts-ignore
export const LRS = createStore<ReactType>({}, middleware);
// @ts-ignore
LRS.api.setAcceptForHost("https://link-dbpedia.herokuapp.com/", "text/turtle");

LRS.namespaces.api = Namespace(FRONTEND_URL);
LRS.namespaces.app = Namespace(FRONTEND_URL);
LRS.namespaces.dbp = Namespace("http://dbpedia.org/property/");
LRS.namespaces.dbdt = Namespace("http://dbpedia.org/datatype/");
LRS.namespaces.dbpediaData = Namespace("http://dbpedia.org/data/");
LRS.namespaces.umbelRc = Namespace("http://umbel.org/umbel/rc/");
LRS.namespaces.wikibase = Namespace("http://wikiba.se/ontology-beta#");

export const NS = LRS.namespaces;

(window as any).LRS = LRS;
if (typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
    (window as any).dev = new LinkDevTools("");
}
