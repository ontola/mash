import LinkDevTools from "@ontola/link-devtools";
import { Quad } from "@ontologies/core";
import importToArray from "import-to-array";
import * as LinkLib from "link-lib";
import * as LinkRedux from "link-redux";
import * as Rdflib from "rdflib";
import * as React from "react";

import { FRONTEND_URL } from "./helpers/config";
import { history } from "./helpers/history";
import { createMiddleware } from "./middleware";
import * as ontology from "./ontology";
import ll from "./ontology/ll";

(Rdflib.Fetcher as any).crossSiteProxyTemplate = `${FRONTEND_URL}proxy?iri={uri}`;

// @ts-ignore
export const LRS = LinkLib.createStore<React.ElementType>({}, createMiddleware(history));
// @ts-ignore
LRS.api.setAcceptForHost("https://ontola-mash.herokuapp.com/", "text/turtle");

interface ModuleDescription {
    iri: string;
    middlewares: any[];
    ontologyStatements: Quad[];
    version: number;
    views: Array<LinkLib.ComponentRegistration<React.ElementType<any>>>;
}

(LRS as any).installedModules = [];
(LRS as any).registerModule = (registration: ModuleDescription) => {
    if ((LRS as any).installedModules.includes(registration.iri)) {
        console.log("Bailing out of registration, module already present");
        return;
    }

    console.log("Module registration requested", registration);

    // (LRS as any).externalMiddlewares.push(...registration.middlewares);
    registration.middlewares.forEach((mw) => {
        const storeBound = mw(LRS);
        LRS.dispatch = storeBound(LRS.dispatch);
    });
    console.log("Added middleware");

    LRS.addOntologySchematics(registration.ontologyStatements || []);

    LRS.registerAll(...registration.views);
    (LRS as any).store.touch(ll.ns("viewRegistrations"));
    (LRS as any).touch();
    console.log("Added views");

    (LRS as any).installedModules += registration.iri;
    console.log("Marked as registered");
};
(window as any).Rdflib = Rdflib;
(window as any).React = React;
(window as any).LinkLib = LinkLib;
(window as any).LinkRedux = LinkRedux;

importToArray(ontology).forEach((o) => {
    LRS.addOntologySchematics(o);
    (LRS as any).store.addStatements(o);
});

Object.defineProperty(window, "LRS", {
    value: LRS,
    writable: false,
});
if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
    window.dev = new LinkDevTools();
}
