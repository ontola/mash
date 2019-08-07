import { defaultNS as NS } from "link-lib";
import { Literal, NamedNode, Namespace, Statement } from "rdflib";

const ldp = Namespace("http://www.w3.org/ns/ldp#");

export const ldpOntology = [
  new Statement(ldp("Container"), NS.rdf("type"), NS.rdfs("Class")),
  new Statement(ldp("Container"), NS.schema("name"), new Literal("Folder")),
  new Statement(ldp("Container"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/folder")),
];
