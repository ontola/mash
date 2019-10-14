import { defaultNS as NS } from "link-lib";
import { Literal, NamedNode, Statement } from "rdflib";

export const llOntology = [
  rdfFactory.quad(NS.ll("InstallableComponent"), NS.rdf("type"), NS.rdfs("Class")),
  rdfFactory.quad(NS.ll("InstallableComponent"), NS.rdfs("subClassOf"), NS.rdfs("Class")),
  rdfFactory.quad(NS.ll("InstallableComponent"), NS.schema("name"), new Literal("Extension")),
  rdfFactory.quad(NS.ll("InstallableComponent"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/extension")),
];
