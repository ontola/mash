import { defaultNS as NS } from "link-lib";
import { Literal, Statement } from "rdflib";

export const dbpediaOntology = [
  rdfFactory.quad(NS.dbo("wikiPageExternalLink"), NS.rdf("type"), NS.rdf("Property")),
  rdfFactory.quad(NS.dbo("wikiPageExternalLink"), NS.schema("name"), new Literal("External links")),
];
