import { defaultNS as NS } from "link-lib";
import { Literal, NamedNode, Namespace, Statement } from "rdflib";

const ldp = Namespace("http://www.w3.org/ns/ldp#");

export const ldpOntology = [
  rdfFactory.quad(ldp("Container"), NS.rdf("type"), NS.rdfs("Class")),
  rdfFactory.quad(ldp("Container"), NS.schema("name"), new Literal("Folder")),
  rdfFactory.quad(ldp("Container"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/folder")),
];
