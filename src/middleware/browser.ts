import { createNS } from "@ontologies/core";

import { actionIRI } from "../helpers/iris";
import browser from "../ontology/browser";

import { bookmarks } from "./browser/bookmarks";
import { extensions } from "./browser/extensions";

export const browserMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.browser = createNS("https://ontola-mash.herokuapp.com/");

  function browserAction(subject, action, payload: { [k: string]: string } = {}) {
    return browser.ns(actionIRI(subject, action, payload));
  }

  store.actions.browser = {};
  store.actions.browser.navigate = (iri) => store.exec(browserAction(iri, browser.ns("navigate")));

  const components = [
    bookmarks(store),
    extensions(store),
  ];

  components.forEach((component) => {
    store.actions.browser = {
      ...store.actions.browser,
      ...component.actions,
    };
  });

  const initialData = components
    .reduce((acc, cur) => [...acc, ...cur.initialData()], []);
  store.processDelta(initialData, true);

  /**
   * Middleware handler
   */
  return (next) => (iri, opts) => {
    if (!iri.value.startsWith(browser.ns("").value)) {
      return next(iri, opts);
    }

    for (const component of components) {
      const ret = component.handle(iri, opts);
      if (ret !== undefined) {
        return ret;
      }
    }

    return next(iri, opts);
  };
};
