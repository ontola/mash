import rdfFactory, { createNS, NamedNode, Node } from "@ontologies/core";
import rdfx from "@ontologies/rdf";
import schema from "@ontologies/schema";
import { SomeNode } from "link-lib";
import { IndexedFormula, Serializer } from "rdflib";
import SolidAuthClient from "solid-auth-client";
import { replace } from "../helpers/delta";

import { createActionPair } from "../helpers/iris";
import solidActions from "../ontology/solidActions";

interface SolidParams {
  fileName: string;
  folderName: string;
  subject: NamedNode;
  session: NamedNode;
  template: Node;
  graph: Node;
}

export const solidMiddleware = (store) => {
  // TODO: proper IRI
  store.namespaces.solid = createNS(`http://www.w3.org/ns/solid/actions/`);

  const { dispatch, parse } = createActionPair<SolidParams>(solidActions.ns, store);
  store.actions.solid = {
    createFile: (folder: NamedNode, fileName: string, template?: SomeNode) =>
      dispatch(
        "create/file",
        {
          fileName,
          subject: folder,
          template,
        },
      ),
    createFolder: (folder: NamedNode, folderName: string) =>
      dispatch("create/folder", { subject: folder, folderName }),
    deleteFile: (file: NamedNode) => dispatch("delete/file", { subject: file }),
    login: () => dispatch("login"),
    logout: () => dispatch("logout"),
    save: (graph: NamedNode) => dispatch("save", { graph }),
  };

  const guestSessionIRI = solidActions.ns("session/guest");
  store.processDelta([
    replace(guestSessionIRI, rdfx.type, schema.Person),
    replace(guestSessionIRI, rdfx.type, solidActions.ns("Session")),
    replace(guestSessionIRI, schema.name, rdfFactory.literal("Guest")),
  ], true);

  const updateSession = (session) => {
    const iri = session
      ? solidActions.ns(`session/logged_in?session=${encodeURIComponent(session.webId)}`)
      : solidActions.ns("session/logged_out");

    store.exec(iri);
  };

  SolidAuthClient.trackSession(updateSession);

  const currentUserIRI = solidActions.ns("session/user");
  const setCurrentUser = (session: NamedNode) => ([
    replace(currentUserIRI, rdfx.type, solidActions.ns("Session")),
    replace(currentUserIRI, solidActions.ns("iri"), session),
  ]);

  store.processDelta(setCurrentUser((solidActions.ns("session/guest"))), true);

  /**
   * Middleware handler
   */
  return (next) => (iri, opts) => {
    if (!iri.value.startsWith(solidActions.ns("").value)) {
      return next(iri, opts);
    }

    const { base, params } = parse(iri);

    switch (base.value) {
      case solidActions.ns("session/logged_out").value: {
        store.processDelta(setCurrentUser(solidActions.ns("session/guest")), true);
        store.actions.ontola.showSnackbar("Logged out");

        return Promise.resolve();
      }

      case solidActions.ns("session/logged_in").value: {
        store.processDelta(setCurrentUser(params.session), true);
        store.actions.ontola.showSnackbar(`Logged in as '${params.session}'`);

        return Promise.resolve();
      }

      case solidActions.ns("login").value: {
        return SolidAuthClient.popupLogin({
          popupUri: "https://solid.community/common/popup.html",
        });
      }

      case solidActions.ns("logout").value: {
        return SolidAuthClient.logout();
      }

      case solidActions.ns("create/file").value: {
        const resource = rdfFactory.namedNode(`${params.subject.value}${params.fileName}`);

        const options: RequestInit = {
          body: undefined,
          headers: {
            ["Content-Type"]: undefined,
          },
          method: "PUT",
        };

        const template = params.template;
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
        ).then(() => store.getEntity(params.subject, { reload: true }));
      }

      case solidActions.ns("create/folder").value: {
        const resource = rdfFactory.namedNode(`${params.subject.value}${params.folderName}/.dummy`);

        return store.api.fetcher._fetch(resource.value, { method: "PUT" })
          .then(store.api.fetcher._fetch(resource.value, { method: "DELETE" }))
          .then(() => store.getEntity(params.subject, { reload: true }));
      }

      case solidActions.ns("delete/file").value: {
        return store.api.fetcher._fetch(
          params.subject.value,
          { method: "DELETE" },
        ).then(() => store.removeResource(params.subject));
      }

      case solidActions.ns("save").value: {
        return store.api.fetcher.putBack(params.graph);
      }

      default: {
        return next(iri, opts);
      }
    }
  };
};
