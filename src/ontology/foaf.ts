import { defaultNS as NS } from "link-lib";
import { Literal, NamedNode, Statement } from "rdflib";

export const foafOntology = [
  new Statement(NS.foaf("gender"), NS.rdf("type"), NS.rdf("Property")),
  new Statement(NS.foaf("gender"), NS.rdfs("label"), new Literal("Gender")),
  new Statement(NS.foaf("gender"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/wc")),

  new Statement(NS.foaf("homepage"), NS.rdf("type"), NS.rdf("Property")),
  new Statement(NS.foaf("homepage"), NS.rdfs("label"), new Literal("Homepage")),
  new Statement(NS.foaf("homepage"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/wc")),
];
