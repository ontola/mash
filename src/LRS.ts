import LinkedRenderStore, { memoizedNamespace } from "link-lib";
import { Fetcher } from "rdflib";
import { ReactType } from "react";

import { FRONTEND_URL } from "./helpers/config";
import { LinkDevTools } from "./helpers/LinkDevTools";

(Fetcher as any).crossSiteProxyTemplate = `${FRONTEND_URL}proxy?iri={uri}`;

export const LRS = new LinkedRenderStore<ReactType>();

// @ts-ignore
LRS.api.setAcceptForHost("https://link-dbpedia.herokuapp.com/", "text/turtle");

LRS.namespaces.api = memoizedNamespace(FRONTEND_URL);
LRS.namespaces.app = memoizedNamespace(FRONTEND_URL);
LRS.namespaces.dbp = memoizedNamespace("http://dbpedia.org/property/");
LRS.namespaces.dbpediaData = memoizedNamespace("http://dbpedia.org/data/");

export const NS = LRS.namespaces;

(window as any).LRS = LRS;
if (typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
    (window as any).dev = new LinkDevTools("");
}
