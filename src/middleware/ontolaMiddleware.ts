/**
 * Copyright 2019
 * Argu B.V.
 */

import rdfFactory, { Literal, NamedNode } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
} from "link-lib";
import { LinkReduxLRSType } from "link-redux";
import { Collection } from "rdflib";
import { ElementType } from "react";

import { History } from "../helpers/history";
import ontola from "../ontology/ontola";

export const ontolaMiddleware = (history: History): MiddlewareFn<ElementType> =>
  (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.ontola = {};

  const ontolaActionPrefix = ontola.ns("actions/").value;

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
      ontola.ns("snackbar/manager"),
      rdf.type,
      ontola.ns("snackbar/Manager"),
      store.namespaces.ll("add"),
    ),
    rdfFactory.quad(
      ontola.ns("snackbar/manager"),
      ontola.ns("snackbar/queue"),
      snackbarQueue as unknown as Literal,
      store.namespaces.ll("add"),
    ),
  ], true);

  const queueSnackbar = (text: string) => {
    const s = rdfFactory.blankNode();

    const queue = store.getResourceProperty(ontola.ns("snackbar/manager"), ontola.ns("snackbar/queue"));

    return [
      rdfFactory.quad(
        s,
        store.namespaces.rdf("type"),
        ontola.ns("snackbar/Snackbar"),
        store.namespaces.ll("add"),
      ),
      rdfFactory.quad(
        s,
        store.namespaces.schema("text"),
        rdfFactory.literal(text),
        store.namespaces.ll("add"),
      ),
      rdfFactory.quad(
        ontola.ns("snackbar/manager"),
        ontola.ns("snackbar/queue"),
        // @ts-ignore
        Collection.fromValue([...queue.elements, s]),
        store.namespaces.ll("replace"),
      ),
    ];
  };

  const shiftSnackbar = () => {
    const queue = store.getResourceProperty(ontola.ns("snackbar/manager"), ontola.ns("snackbar/queue")) as Collection;
    queue.shift();

    return [
      rdfFactory.quad(
        ontola.ns("snackbar/manager"),
        ontola.ns("snackbar/queue"),
        // @ts-ignore
        Collection.fromValue(queue.elements),
        store.namespaces.ll("replace"),
      ),
    ];
  };

  (store as any).actions.ontola.showSnackbar = (message: Literal | string) => {
    store.exec(store.namespaces.ontola.ns(`actions/snackbar?text=${encodeURIComponent(message.toString())}`));
  };

  /**
   * Ontola dialog setup
   */

  const dialogManager = ontola.ns("dialog/manager");

  store.processDelta([
    rdfFactory.quad(
      dialogManager,
      rdf.type,
      ontola.ns("dialog/Manager"),
      store.namespaces.ll("add"),
    ),
  ], true);

  const hideDialog = () => [
    rdfFactory.quad(
      dialogManager,
      ontola.ns("dialog/resource"),
      ontola.ns("dialog/rm"),
      store.namespaces.ll("remove"),
    ),
  ];

  const showDialog = (value: string) => [
    rdfFactory.quad(
      dialogManager,
      ontola.ns("dialog/resource"),
      rdfFactory.namedNode(value),
      store.namespaces.ll("replace"),
    ),
    rdfFactory.quad(
      dialogManager,
      ontola.ns("dialog/opener"),
      store.namespaces.app(currentPath().slice(1)),
      store.namespaces.ll("replace"),
    ),
  ];

  (store as any).actions.ontola.showDialog = (resource: NamedNode) => {
    store.exec(store.namespaces.ontola.ns(`actions/dialog/alert?resource=${encodeURIComponent(resource.value)}`));
  };

  (store as any).actions.ontola.navigate = (resource: NamedNode) => {
    store.exec(store.namespaces.ontola.ns(`actions/dialog/redirect?location=${encodeURIComponent(resource.value)}`));
  };

  /**
   * Miscellaneous
   */

  history.listen((_, action) => {
    if (["POP", "PUSH"].includes(action)) {
      store.exec(ontola.ns(`actions/navigation/${action.toLowerCase()}`));
    }
  });

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (!iri.value.startsWith(ontolaActionPrefix)) {
      return next(iri, opts);
    }

    switch (iri) {
      case ontola.ns(`actions/navigation/push`):
      case ontola.ns(`actions/navigation/pop`):
        const dialog = store.getResourceProperty(dialogManager, ontola.ns("dialog/resource"));
        if (dialog) {
          store.exec(ontola.ns("actions/dialog/close"));
        }
        return next(iri, opts);
      default:
    }

    if (iri === store.namespaces.ontola.ns("actions/dialog/close")) {
      store.processDelta(hideDialog(), true);
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola.ns("actions/dialog/alert").value)) {
      const resource = new URL(iri.value).searchParams.get("resource");

      history.push(currentPath());
      if (!resource) {
        throw new Error("Argument 'value' was missing.");
      }
      store.processDelta(showDialog(resource), true);

      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola.ns("actions/snackbar/finished").value)) {
      store.processDelta(shiftSnackbar(), true);
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola.ns("actions/snackbar").value)) {
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
