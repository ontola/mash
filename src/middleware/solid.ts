import { Literal, NamedNode, Namespace, Statement } from "rdflib";
import SolidAuthClient from "solid-auth-client";

export const solidMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.solid = Namespace(`http://www.w3.org/ns/solid/actions/`);
  const NS = store.namespaces;

  store.actions.solid = {};
  store.actions.solid.login = () => store.exec(NS.solid("login"));
  store.actions.solid.logout = () => store.exec(NS.solid("logout"));

  store.processDelta([
    new Statement(
      NS.solid("session/guest"),
      NS.rdf("type"),
      NS.schema("Person"),
      NS.ll("replace"),
    ),
    new Statement(
      NS.solid("session/guest"),
      NS.rdf("type"),
      NS.solid("Session"),
      NS.ll("replace"),
    ),
    new Statement(
      NS.solid("session/guest"),
      NS.schema("name"),
      new Literal("Guest"),
      NS.ll("replace"),
    ),
  ], true);

  const updateSession = (session) => {
    const actionIRI = session
      ? NS.solid(`session/logged_in?session=${encodeURIComponent(session.webId)}`)
      : NS.solid("session/logged_out");

    store.exec(actionIRI);
  };

  SolidAuthClient.trackSession(updateSession);

  const setCurrentUser = (session: NamedNode) => ([
    new Statement(
      NS.solid("session/user"),
      NS.rdf("type"),
      NS.solid("Session"),
      NS.ll("replace"),
    ),
    new Statement(
      NS.solid("session/user"),
      NS.solid("iri"),
      session,
      NS.ll("replace"),
    ),
  ]);

  store.processDelta(setCurrentUser((NS.solid("session/guest"))), true);

  /**
   * Middleware handler
   */
  return (next) => (iri, opts) => {
    if (!iri.value.startsWith(NS.solid("").value)) {
      return next(iri, opts);
    }

    if (iri === NS.solid("session/logged_out")) {
      store.processDelta(setCurrentUser(NS.solid("session/guest")), true);
      store.actions.ontola.showSnackbar("Logged out");
      return Promise.resolve();
    }

    if (iri.value.startsWith(NS.solid("session/logged_in").value)) {
      const session = new URL(iri.value).searchParams.get("session");
      store.processDelta(setCurrentUser(new NamedNode(session)), true);
      store.actions.ontola.showSnackbar(`Logged in as '${session}'`);
      return Promise.resolve();
    }

    if (iri.value.startsWith(NS.solid("login").value)) {
      return SolidAuthClient.popupLogin({
        popupUri: "https://solid.community/common/popup.html",
      });
    }

    if (iri.value.startsWith(NS.solid("logout").value)) {
      return SolidAuthClient.logout();
    }

    return next(iri, opts);
  };
};
