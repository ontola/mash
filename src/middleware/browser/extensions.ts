import rdfFactory from "@ontologies/core";
import rdf from "@ontologies/rdf";
import schema from "@ontologies/schema";

import browser from "../../ontology/browser";
import ll from "../../ontology/ll";

export const extensions = (_) => {
  // const extensionAction = (subject, action, payload = {}): NamedNode => {
  //   return browser.ns(`extensions/${actionIRI(subject, action, payload)}`);
  // };

  return {
    actions: {},
    handle: (iri, _) => {
      if (!iri.value.startsWith(browser.ns("bookmarks/").value)) {
        return undefined;
      }

      return undefined;
    },
    initialData: () => [
      [
        rdfFactory.namedNode("about:extensions"),
        rdf.type,
        browser.ns("ExtensionsManager"),
        ll.ns("replace"),
      ],
      [
        rdfFactory.namedNode("about:extensions"),
        schema.name,
        rdfFactory.literal("Extensions"),
        ll.ns("replace"),
      ],
      [
        rdfFactory.namedNode("about:extensions"),
        schema.description,
        rdfFactory.literal(`
          Below is a list of known installable extensions. After installing an extension, its functionality will be
          available in the browser as long as you don't refresh the page. Data should be stored in your pod, so don't
          worry about losing it when refreshing. Which extensions you've installed isn't stored in your pod yet, so
          refreshing the page will effectively disable all extensions.
        `),
        ll.ns("replace"),
      ],
    ],
  };
};
