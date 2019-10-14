import rdfFactory, { createNS } from "@ontologies/core"
import rdf from "@ontologies/rdf";
import schema from "@ontologies/schema";

import dbo from "./dbo";

const dbpediaData = createNS("http://dbpedia.org/data/");

export const dbpediaOntology = [
  rdfFactory.quad(dbo.ns("wikiPageExternalLink"), rdf.type, rdf.Property),
  rdfFactory.quad(dbo.ns("wikiPageExternalLink"), schema.name, rdfFactory.literal("External links")),
];

export default {
  ns: dbpediaData,
};
