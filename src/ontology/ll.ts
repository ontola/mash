import { defaultNS as NS } from "link-lib";
import { Literal, NamedNode, Statement } from "rdflib";

export const llOntology = [
  new Statement(NS.ll("InstallableComponent"), NS.rdf("type"), NS.rdfs("Class")),
  new Statement(NS.ll("InstallableComponent"), NS.rdfs("subClassOf"), NS.rdfs("Class")),
  new Statement(NS.ll("InstallableComponent"), NS.schema("name"), new Literal("Extension")),
  new Statement(NS.ll("InstallableComponent"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/extension")),
];

export default {
  ns: NS.ll,
};
