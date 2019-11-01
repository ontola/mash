import LinkDevTools from "@ontola/link-devtools";
import { Quad } from "@ontologies/core";
import importToArray from "import-to-array";
import {
  RDFStoreOpts,
  RequestInitGenerator,
  transformers,
} from "link-lib";
import * as LinkLib from "link-lib";
import { register } from "link-redux";
import * as LinkRedux from "link-redux";
import * as Rdflib from "rdflib";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { FRONTEND_URL } from "./helpers/config";
import { history } from "./helpers/history";
import types from "./helpers/types";
import { applyWorkarounds, WorkaroundOpts } from "./helpers/workarounds";
import { createMiddleware } from "./middleware";
import * as ontology from "./ontology";
import ll from "./ontology/ll";

import * as outlines from "./outlines";
import * as views from "./views";

interface CreateLRSOpts {
  applyWorkarounds?: boolean;
  workaroundOpts?: WorkaroundOpts;
  rdfStoreOpts?: RDFStoreOpts;
  makeGlobal?: boolean;
}

interface ModuleDescription {
  iri: string;
  middlewares: any[];
  ontologyStatements: Quad[];
  version: number;
  views: Array<LinkLib.ComponentRegistration<React.ElementType<any>>>;
}

export function createLRS(opts: CreateLRSOpts = {}) {
  (Rdflib.Fetcher as any).crossSiteProxyTemplate = `${FRONTEND_URL}proxy?iri={uri}`;

  const reporter = ((e): void => { throw e; });
  const store = new LinkLib.RDFStore(opts.rdfStoreOpts);
  const fetcher = new Rdflib.Fetcher((store as any).store);

  const PRIO_MAX = 1.0;

  const lrs = LinkLib.createStore<React.ElementType>({
    apiOpts: {
      fetcher,
      report: reporter,
      requestInitGenerator: new RequestInitGenerator({
        credentials: "include",
        csrfFieldName: "csrf-token",
        mode: "cors",
        xRequestedWith: "XMLHTTPRequest",
      }),
      transformers: [
        {
          acceptValue: PRIO_MAX,
          mediaType: "text/n3",
          transformer: transformers.processRDF,
        },
        {
          acceptValue: PRIO_MAX,
          mediaType: "text/turtle",
          transformer: transformers.processRDF,
        },
        {
          acceptValue: PRIO_MAX,
          mediaType: "application/n-triples",
          transformer: transformers.processRDF,
        },
      ],
    },
    store,
  }, createMiddleware(history));

  lrs.api.setAcceptForHost("https://ontola-mash.herokuapp.com/", "text/turtle");

  (lrs as any).installedModules = [];
  (lrs as any).registerModule = (registration: ModuleDescription) => {
    if ((lrs as any).installedModules.includes(registration.iri)) {
      console.log("Bailing out of registration, module already present");
      return;
    }

    console.log("Module registration requested", registration);

    // (LRS as any).externalMiddlewares.push(...registration.middlewares);
    registration.middlewares.forEach((mw) => {
      const storeBound = mw(lrs);
      lrs.dispatch = storeBound(lrs.dispatch);
    });
    console.log("Added middleware");

    lrs.addOntologySchematics(registration.ontologyStatements || []);

    lrs.registerAll(...registration.views);
    (lrs as any).store.touch(ll.ns("viewRegistrations"));
    (lrs as any).touch();
    console.log("Added views");

    (lrs as any).installedModules += registration.iri;
    console.log("Marked as registered");
  };

  importToArray(ontology).forEach((o) => {
    lrs.addOntologySchematics(o);
  });

  lrs.addOntologySchematics(types);

  const renderers = [
    ...importToArray(outlines),
    ...importToArray(views),
  ];

  lrs.registerAll(
    ...renderers.map((imp: any) => {
      if (imp) {
        return register(imp);
      }

      return undefined;
    }),
  );

  if (opts.applyWorkarounds) {
    applyWorkarounds(lrs, opts.workaroundOpts);
  }

  if (opts.makeGlobal) {
    (window as any).Rdflib = Rdflib;
    (window as any).React = React;
    (window as any).ReactDOM = ReactDOM;
    (window as any).LinkLib = LinkLib;
    (window as any).LinkRedux = LinkRedux;

    if (typeof window.LRS === "undefined") {
      Object.defineProperty(window, "LRS", {
        value: lrs,
        writable: false,
      });
    }
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
      window.dev = new LinkDevTools();
    }
  }

  return {
    lrs,
  };
}
