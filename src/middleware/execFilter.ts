/**
 * Filter to prevent superfluous unhandled middleware action from going to execActionByIRI
 *
 * Acts as a security filter as well, to prevent cross-site action injections.
 */

import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from "link-lib";
import { NamedNode } from "rdflib";

export const website = window.origin || "https://example.com";
export const frontendIRI = NamedNode.find(website!);

const execFilter = () => (): MiddlewareWithBoundLRS => {
  const executableSites = [
    NamedNode.find(new URL(frontendIRI.value).origin),
  ];

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    if (executableSites.includes(NamedNode.find(new URL(iri.value).origin))) {
      return next(iri, opts);
    }

    return Promise.resolve();
  };
};

export default execFilter;
