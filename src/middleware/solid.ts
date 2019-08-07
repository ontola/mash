import { Literal, NamedNode, Namespace, Statement } from "rdflib";
import SolidAuthClient from "solid-auth-client";

import { actionIRI } from "../helpers/iris";

export const solidMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.solid = Namespace(`http://www.w3.org/ns/solid/actions/`);
  const NS = store.namespaces;

  store.actions.solid = {
    createFile: (folder: NamedNode, filename: string) =>
      store.exec(NS.solid(actionIRI(folder, "create/file", { filename }))),
    login: () => store.exec(NS.solid("login")),
    logout: () => store.exec(NS.solid("logout")),
  };

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
    const iri = session
      ? NS.solid(`session/logged_in?session=${encodeURIComponent(session.webId)}`)
      : NS.solid("session/logged_out");

    store.exec(iri);
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

    if (iri.value.startsWith(NS.solid("create/file").value)) {
      const search = new URL(iri.value).searchParams;
      const filename = search.get("filename");
      const folder = new NamedNode(search.get("iri"));
      const resource = new NamedNode(`${folder.value}${filename}`);

      return store.api.fetcher._fetch(
        resource.value,
        {
          method: "PUT",
        },
      ).then(() => store.getEntity(folder, { reload: true }));
    }

    return next(iri, opts);
  };
};
