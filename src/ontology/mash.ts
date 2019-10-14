import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

const mash = createNS("https://ontola-mash.herokuapp.com/");

export const mashOntology = [
  rdfFactory.quad(mash("BookmarksList"), rdf.type, rdfs.Class),
  rdfFactory.quad(mash("BookmarksList"), schema.name, rdfFactory.literal("Bookmarks folder")),
  rdfFactory.quad(mash("BookmarksList"), schema.image, rdfFactory.namedNode("https://material.io/resources/icons/folder_special")),
];
