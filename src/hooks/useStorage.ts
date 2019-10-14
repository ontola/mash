import rdfFactory, { NamedNode } from "@ontologies/core";
import { useDataInvalidation, useLRS } from "link-redux";

import solidActions from "../ontology/solidActions";

/** Returns the storage IRI from the currently signed in user, as declared in their webid/pod. */
export const useStorage = () => {
  const lrs = useLRS();
  const pod = lrs.getResourceProperty(
    solidActions.ns("session/user"),
    solidActions.ns("iri"),
  );
  const storage = !pod ? undefined : lrs.getResourceProperty(
    pod as NamedNode,
    rdfFactory.namedNode("http://www.w3.org/ns/pim/space#storage"),
  );

  // We don't have a way to map random resources to a view (yet), so we need to put some extra logic in to update our
  // view when resources apart from our own subject change.
  useDataInvalidation({
    dataSubjects: [
      pod as NamedNode,
      storage as NamedNode,
    ].filter(Boolean),
    subject: solidActions.ns("session/user"),
  });

  return storage;
};
