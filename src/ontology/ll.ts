import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

const ll = createNS("http://purl.org/link-lib/");

export const llOntology = [
  rdfFactory.quad(ll("InstallableComponent"), rdf.type, rdfs.Class),
  rdfFactory.quad(ll("InstallableComponent"), rdfs.subClassOf, rdfs.Class),
  rdfFactory.quad(ll("InstallableComponent"), schema.name, rdfFactory.literal("Extension")),
  rdfFactory.quad(ll("InstallableComponent"), schema.image, rdfFactory.namedNode("https://material.io/resources/icons/extension")),
];

export default {
  ns: ll,

  ErrorResource: ll("ErrorResource"),
  LoadingResource: ll("LoadingResource"),
};
