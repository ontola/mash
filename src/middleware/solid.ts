import { SomeNode } from "link-lib";
import { BlankNode, IndexedFormula, Literal, NamedNode, Namespace, Serializer, Statement } from "rdflib";
import SolidAuthClient from "solid-auth-client";

import { actionIRI } from "../helpers/iris";

export const solidMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.solid = Namespace(`http://www.w3.org/ns/solid/actions/`);
  const NS = store.namespaces;

  store.actions.solid = {
    createFile: (folder: NamedNode, filename: string, template?: SomeNode) =>
      store.exec(NS.solid(actionIRI(
        folder,
        "create/file",
        {
          filename,
          template: template ? template.value : undefined,
        },
      ))),
    createFolder: (folder: NamedNode, foldername: string) =>
      store.exec(NS.solid(actionIRI(folder, "create/folder", { foldername }))),
    deleteFile: (file: NamedNode) =>
      store.exec(NS.solid(actionIRI(file, "delete/file"))),
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
      const fileName = search.get("filename");
      const folder = new NamedNode(search.get("iri"));
      const templateVal = search.get("template");
      const template = templateVal.includes(":") ? new NamedNode(templateVal) : new BlankNode(templateVal);
      const resource = new NamedNode(`${folder.value}${fileName}`);

      const options: RequestInit = {
        body: undefined,
        headers: {
          ["Content-Type"]: undefined,
        },
        method: "PUT",
      };

      if (template) {
        const serializer = new Serializer(new IndexedFormula());
        const input = store.store
          .match(template, null, null, null)
          .map((s) => s.subject === template
            ? new Statement(resource, s.predicate, s.object, s.why)
            : s);
        const rdfSerialization = serializer.statementsToN3(input);
        options.headers["Content-Type"] = "text/n3";
        options.body = rdfSerialization;
      }

      return store.api.fetcher._fetch(
        resource.value,
        options,
      ).then(() => store.getEntity(folder, { reload: true }));
    }

    if (iri.value.startsWith(NS.solid("create/folder").value)) {
      const search = new URL(iri.value).searchParams;
      const folderName = search.get("foldername");
      const folder = new NamedNode(search.get("iri"));
      const resource = new NamedNode(`${folder.value}${folderName}/.dummy`);

      return store.api.fetcher._fetch(resource.value, { method: "PUT" })
        .then(store.api.fetcher._fetch(resource.value, { method: "DELETE" }))
        .then(() => store.getEntity(folder, { reload: true }));
    }

    if (iri.value.startsWith(NS.solid("delete/file").value)) {
      const search = new URL(iri.value).searchParams;
      const file = new NamedNode(search.get("iri"));

      return store.api.fetcher._fetch(
        file.value,
        { method: "DELETE" },
      ).then(() => store.removeResource(file));
    }

    return next(iri, opts);
  };
};
