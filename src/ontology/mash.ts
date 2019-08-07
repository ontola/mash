import { defaultNS as NS } from "link-lib";
import { Literal, NamedNode, Namespace, Statement } from "rdflib";

const mash = Namespace("https://ontola-mash.herokuapp.com/");

export const mashOntology = [
  new Statement(mash("BookmarksList"), NS.rdf("type"), NS.rdfs("Class")),
  new Statement(mash("BookmarksList"), NS.schema("name"), new Literal("Bookmarks folder")),
  new Statement(mash("BookmarksList"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/folder_special")),
];
