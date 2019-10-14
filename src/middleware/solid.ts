import rdfFactory, { createNS, NamedNode } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import schema from "@ontologies/schema";
import { SomeNode } from "link-lib";
import { IndexedFormula, Serializer } from "rdflib";
import SolidAuthClient from "solid-auth-client";

import { actionIRI } from "../helpers/iris";
import ld from "../ontology/ld";
import solidActions from "../ontology/solidActions";

export const solidMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.solid = createNS(`http://www.w3.org/ns/solid/actions/`);

  store.actions.solid = {
    createFile: (folder: NamedNode, filename: string, template?: SomeNode) =>
      store.exec(solidActions.ns(actionIRI(
        folder,
        "create/file",
        {
          filename,
          template: template ? template.value : undefined,
        },
      ))),
    createFolder: (folder: NamedNode, foldername: string) =>
      store.exec(solidActions.ns(actionIRI(folder, "create/folder", { foldername }))),
    deleteFile: (file: NamedNode) =>
      store.exec(solidActions.ns(actionIRI(file, "delete/file"))),
    login: () => store.exec(solidActions.ns("login")),
    logout: () => store.exec(solidActions.ns("logout")),
    // TODO: dispatch action
    save: (graph: NamedNode) => store.api.fetcher.putBack(graph),
  };

  store.processDelta([
    rdfFactory.quad(
      solidActions.ns("session/guest"),
      rdf.type,
      schema.Person,
      ld.replace,
    ),
    rdfFactory.quad(
      solidActions.ns("session/guest"),
      rdf.type,
      solidActions.ns("Session"),
      ld.replace,
    ),
    rdfFactory.quad(
      solidActions.ns("session/guest"),
      schema.name,
      rdfFactory.literal("Guest"),
      ld.replace,
    ),
  ], true);

  const updateSession = (session) => {
    const iri = session
      ? solidActions.ns(`session/logged_in?session=${encodeURIComponent(session.webId)}`)
      : solidActions.ns("session/logged_out");

    store.exec(iri);
  };

  SolidAuthClient.trackSession(updateSession);

  const setCurrentUser = (session: NamedNode) => ([
    rdfFactory.quad(
      solidActions.ns("session/user"),
      rdf.type,
      solidActions.ns("Session"),
      ld.replace,
    ),
    rdfFactory.quad(
      solidActions.ns("session/user"),
      solidActions.ns("iri"),
      session,
      ld.replace,
    ),
  ]);

  store.processDelta(setCurrentUser((solidActions.ns("session/guest"))), true);

  /**
   * Middleware handler
   */
  return (next) => (iri, opts) => {
    if (!iri.value.startsWith(solidActions.ns("").value)) {
      return next(iri, opts);
    }

    if (iri === solidActions.ns("session/logged_out")) {
      store.processDelta(setCurrentUser(solidActions.ns("session/guest")), true);
      store.actions.ontola.showSnackbar("Logged out");
      return Promise.resolve();
    }

    if (iri.value.startsWith(solidActions.ns("session/logged_in").value)) {
      const session = new URL(iri.value).searchParams.get("session");
      store.processDelta(setCurrentUser(rdfFactory.namedNode(session)), true);
      store.actions.ontola.showSnackbar(`Logged in as '${session}'`);
      return Promise.resolve();
    }

    if (iri.value.startsWith(solidActions.ns("login").value)) {
      return SolidAuthClient.popupLogin({
        popupUri: "https://solid.community/common/popup.html",
      });
    }

    if (iri.value.startsWith(solidActions.ns("logout").value)) {
      return SolidAuthClient.logout();
    }

    if (iri.value.startsWith(solidActions.ns("create/file").value)) {
      const search = new URL(iri.value).searchParams;
      const fileName = search.get("filename");
      const folder = rdfFactory.namedNode(search.get("iri"));
      const templateVal = search.get("template");
      const template = templateVal.includes(":")
        ? rdfFactory.namedNode(templateVal)
        : rdfFactory.blankNode(templateVal);
      const resource = rdfFactory.namedNode(`${folder.value}${fileName}`);

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
            ? rdfFactory.quad(resource, s.predicate, s.object, s.why)
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

    if (iri.value.startsWith(solidActions.ns("create/folder").value)) {
      const search = new URL(iri.value).searchParams;
      const folderName = search.get("foldername");
      const folder = rdfFactory.namedNode(search.get("iri"));
      const resource = rdfFactory.namedNode(`${folder.value}${folderName}/.dummy`);

      return store.api.fetcher._fetch(resource.value, { method: "PUT" })
        .then(store.api.fetcher._fetch(resource.value, { method: "DELETE" }))
        .then(() => store.getEntity(folder, { reload: true }));
    }

    if (iri.value.startsWith(solidActions.ns("delete/file").value)) {
      const search = new URL(iri.value).searchParams;
      const file = rdfFactory.namedNode(search.get("iri"));

      return store.api.fetcher._fetch(
        file.value,
        { method: "DELETE" },
      ).then(() => store.removeResource(file));
    }

    return next(iri, opts);
  };
};
