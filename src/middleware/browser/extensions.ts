import { Literal, NamedNode } from "rdflib";

export const extensions = (_, ns) => {
  // const extensionAction = (subject, action, payload = {}): NamedNode => {
  //   return ns.browser(`extensions/${actionIRI(subject, action, payload)}`);
  // };

  return {
    actions: {},
    handle: (iri, _) => {
      if (!iri.value.startsWith(ns.browser("bookmarks/").value)) {
        return undefined;
      }

      return undefined;
    },
    initialData: () => [
      [
        new NamedNode("about:extensions"),
        ns.rdf("type"),
        ns.browser("ExtensionsManager"),
        ns.ll("replace"),
      ],
      [
        new NamedNode("about:extensions"),
        ns.schema("name"),
        new Literal("Extensions"),
        ns.ll("replace"),
      ],
      [
        new NamedNode("about:extensions"),
        ns.schema("description"),
        new Literal(`
          Below is a list of known installable extensions. After installing an extension, its functionality will be
          available in the browser as long as you don't refresh the page. Data should be stored in your pod, so don't
          worry about losing it when refreshing. Which extensions you've installed isn't stored in your pod yet, so
          refreshing the page will effectively disable all extensions.
        `),
        ns.ll("replace"),
      ],
    ],
  };
};
