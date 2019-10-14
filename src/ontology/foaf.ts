import { defaultNS as NS } from "link-lib";
import { Literal, NamedNode, Statement } from "rdflib";

export const foafOntology = [
  rdfFactory.quad(NS.foaf("gender"), NS.rdf("type"), NS.rdf("Property")),
  rdfFactory.quad(NS.foaf("gender"), NS.rdfs("label"), new Literal("Gender")),
  rdfFactory.quad(NS.foaf("gender"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/wc")),

  rdfFactory.quad(NS.foaf("homepage"), NS.rdf("type"), NS.rdf("Property")),
  rdfFactory.quad(NS.foaf("homepage"), NS.rdfs("label"), new Literal("Homepage")),
  rdfFactory.quad(NS.foaf("homepage"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/wc")),
];
