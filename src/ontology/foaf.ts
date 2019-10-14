import rdfFactory from "@ontologies/core";
import foaf from "@ontologies/foaf";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

export const foafOntology = [
  rdfFactory.quad(foaf.gender, rdf.type, rdf.Property),
  rdfFactory.quad(foaf.gender, rdfs.label, rdfFactory.literal("Gender")),
  rdfFactory.quad(foaf.gender, schema.image, rdfFactory.namedNode("https://material.io/resources/icons/wc")),

  rdfFactory.quad(foaf.homepage, rdf.type, rdf.Property),
  rdfFactory.quad(foaf.homepage, rdfs.label, rdfFactory.literal("Homepage")),
  rdfFactory.quad(foaf.homepage, schema.image, rdfFactory.namedNode("https://material.io/resources/icons/wc")),
];
