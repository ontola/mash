/**
 * Copyright 2019
 * Argu B.V.
 */

import rdfFactory, { Literal, NamedNode, Node } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import schema from "@ontologies/schema";
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
} from "link-lib";
import { LinkReduxLRSType } from "link-redux";
import { ElementType } from "react";
import { add, remove, replace, seqPush, seqUnshift } from "../helpers/delta";

import { History } from "../helpers/history";
import { createActionPair } from "../helpers/iris";
import app from "../ontology/app";
import ontola from "../ontology/ontola";

interface OntolaParams {
  location: NamedNode;
  resource: Node;
  text: Literal;
}

export const ontolaMiddleware = (history: History): MiddlewareFn<ElementType> =>
  (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.ontola = {};

  const ontolaActionPrefix = ontola.ns("actions/").value;
  const { dispatch, parse } = createActionPair<OntolaParams>(ontola.ns, store);

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

  const snackbarManager = ontola.ns("snackbar/manager");
  const snackbarQueue = rdfFactory.blankNode();

  store.processDelta([
    add(snackbarManager, rdf.type, ontola.ns("snackbar/Manager")),
    add(snackbarManager, ontola.ns("snackbar/queue"), snackbarQueue),
    add(snackbarQueue, rdf.type, rdf.Seq),
  ], true);

  const queueSnackbar = (text: Literal) => {
    const s = rdfFactory.blankNode();

    const queue = store.getResourceProperty<Node>(
      snackbarManager,
      ontola.ns("snackbar/queue"),
    );

    return [
      add(s, rdf.type, ontola.ns("snackbar/Snackbar")),
      add(s, schema.text, text),
      ...seqPush(store, queue, s),
    ];
  };

  const shiftSnackbar = () => {
    const queue = store.getResourceProperty<NamedNode>(
      snackbarManager,
      ontola.ns("snackbar/queue"),
    );

    return seqUnshift(store, queue);
  };

  (store as any).actions.ontola.showSnackbar = (text: Literal | string) =>
    dispatch("actions/snackbar", { text: rdfFactory.literal(text) });

  /**
   * Ontola dialog setup
   */

  const dialogManager = ontola.ns("dialog/manager");

  store.processDelta([
    add(dialogManager, rdf.type, ontola.ns("dialog/Manager")),
  ], true);

  const hideDialog = () => [
    remove(dialogManager, ontola.ns("dialog/resource"), ontola.ns("dialog/rm")),
  ];

  const showDialog = (resource: Node) => [
    replace(dialogManager, ontola.ns("dialog/resource"), resource),
    replace(dialogManager, ontola.ns("dialog/opener"), app.ns(currentPath().slice(1))),
  ];

  (store as any).actions.ontola.showDialog = (resource: Node) =>
    dispatch("actions/dialog/alert", { resource });

  (store as any).actions.ontola.navigate = (location: NamedNode) =>
    dispatch("actions/dialog/redirect", { location });

  /**
   * Miscellaneous
   */

  history.listen((_, action) => {
    if (["POP", "PUSH"].includes(action)) {
      dispatch(`actions/navigation/${action.toLowerCase()}`);
    }
  });

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (!iri.value.startsWith(ontolaActionPrefix)) {
      return next(iri, opts);
    }
    const { base, params } = parse(iri);

    switch (base.value) {
      case ontola.ns("actions/navigation/push").value:
      case ontola.ns("actions/navigation/pop").value:
        const dialog = store.getResourceProperty(dialogManager, ontola.ns("dialog/resource"));
        if (dialog) {
          dispatch("actions/dialog/close");
        }

        return next(iri, opts);

      case ontola.ns("actions/dialog/close").value: {
        store.processDelta(hideDialog(), true);
        return Promise.resolve();
      }

      case ontola.ns("actions/dialog/alert").value: {
        history.push(currentPath());
        store.processDelta(showDialog(params.resource), true);

        return Promise.resolve();
      }

      case ontola.ns("actions/snackbar/finished").value: {
        store.processDelta(shiftSnackbar(), true);
        return Promise.resolve();
      }

      case ontola.ns("actions/snackbar").value: {
        store.processDelta(queueSnackbar(params.text), true);

        return Promise.resolve();
      }

      default: {
        return next(iri, opts);
      }
    }
  };
};
