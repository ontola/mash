import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

const ldp = createNS("http://www.w3.org/ns/ldp#");

export const ldpOntology = [
  rdfFactory.quad(ldp("Container"), rdf.type, rdfs.Class),
  rdfFactory.quad(ldp("Container"), schema.name, rdfFactory.literal("Folder")),
  rdfFactory.quad(ldp("Container"), schema.image, rdfFactory.namedNode("https://material.io/resources/icons/folder")),
];

export default {
  ns: ldp,
};
