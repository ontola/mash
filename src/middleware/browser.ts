import { Namespace } from "rdflib";
import { bookmarks } from "./browser/bookmarks";

export const browserMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.browser = Namespace("https://link-dbpedia.herokuapp.com/");
  const NS = store.namespaces;

  function actionIRI(subject, action, payload: { [k: string]: string } = {}) {
    const query = [
      subject && `iri=${subject.value}`,
      ...Object.entries(payload).map(([k, v]) => [k, encodeURIComponent(v)].join("=")),
    ].filter(Boolean).join("&");

    return NS.browser(`${action}?${query}`);
  }

  store.actions.browser = {};
  store.actions.browser.navigate = (iri) => store.exec(actionIRI(iri, NS.browser("navigate")));

  const components = [
    bookmarks(store, NS),
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
