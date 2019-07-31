import { Namespace } from "rdflib";

const browserMiddleware = (store) => {
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

  /**
   * Middleware handler
   */
  return (next) => (iri, opts) => {
    if (!iri.value.startsWith(NS.browser("").value)) {
      return next(iri, opts);
    }

    return next(iri, opts);
  };
};

export default browserMiddleware;
