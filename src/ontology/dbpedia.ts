import { defaultNS as NS } from "link-lib";
import { Literal, Statement } from "rdflib";

export const dbpediaOntology = [
  new Statement(NS.dbo("wikiPageExternalLink"), NS.rdf("type"), NS.rdf("Property")),
  new Statement(NS.dbo("wikiPageExternalLink"), NS.schema("name"), new Literal("External links")),
];
