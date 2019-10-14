import rdfFactory, { NamedNode } from "@ontologies/core";
import { rdflib } from "link-lib";

export const patchFactory = () => {
  rdfFactory.base.doc = function doc(): NamedNode {
    return rdfFactory.namedNode(rdflib.URI.docpart(this.value));
  };

  rdfFactory.base.site = function site(): NamedNode {
    return rdflib.site(this);
  };

  rdfFactory.toString = function toString() {
    return this.toNQ();
  };
};
