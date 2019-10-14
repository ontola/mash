import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import schema from "@ontologies/schema";

const dbo = createNS("http://dbpedia.org/ontology/");

export const dbpediaOntology = [
  rdfFactory.quad(dbo("wikiPageExternalLink"), rdf.type, rdf.Property),
  rdfFactory.quad(dbo("wikiPageExternalLink"), schema.name, rdfFactory.literal("External links")),
];

export default {
  ns: dbo,
};
