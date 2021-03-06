import { Namespace } from "rdflib";

import { actionIRI } from "../helpers/iris";

import { bookmarks } from "./browser/bookmarks";
import { extensions } from "./browser/extensions";

export const browserMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.browser = Namespace("https://ontola-mash.herokuapp.com/");
  const NS = store.namespaces;

  function browserAction(subject, action, payload: { [k: string]: string } = {}) {
    return NS.browser(actionIRI(subject, action, payload));
  }

  store.actions.browser = {};
  store.actions.browser.navigate = (iri) => store.exec(browserAction(iri, NS.browser("navigate")));

  const components = [
    bookmarks(store, NS),
    extensions(store, NS),
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
    if (!iri.value.startsWith(NS.browser("").value)) {
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
