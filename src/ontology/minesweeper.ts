import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

import ll from "./ll";

const minesweeper = createNS("https://fletcher91.github.io/link-minesweeper/");

const template = rdfFactory.blankNode();

export const minesweeperOntology = [
  rdfFactory.quad(minesweeper("MinesweeperGame"), rdf.type, rdfs.Class, minesweeper("MinesweeperGame")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), rdf.type, ll.ns("InstallableComponent"), minesweeper("MinesweeperGame")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), schema.image, rdfFactory.namedNode("https://material.io/resources/icons/bug_report")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), schema.logo, rdfFactory.namedNode("https://i.imgur.com/zWhWOZh.png")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), schema.name, rdfFactory.literal("Bugsweeper")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), ll.ns("npmLabel"), rdfFactory.literal("link-minesweeper")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), ll.ns("npmVersion"), rdfFactory.literal("1.0.6")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), ll.ns("fileTemplate"), template),
  rdfFactory.quad(minesweeper("MinesweeperGame"), ll.ns("newLabel"), rdfFactory.literal("Create minesweeper game")),

  rdfFactory.quad(template, rdf.type, minesweeper("MinesweeperInit")),
];
