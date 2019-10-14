import { defaultNS as NS } from "link-lib";
import { BlankNode, Literal, NamedNode, Namespace, Statement } from "rdflib";

const minesweeper = Namespace("https://fletcher91.github.io/link-minesweeper/");

const template = new BlankNode();

export const minesweeperOntology = [
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.rdf("type"), NS.rdfs("Class"), minesweeper("MinesweeperGame")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.rdf("type"), NS.ll("InstallableComponent"), minesweeper("MinesweeperGame")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/bug_report")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.schema("logo"), new NamedNode("https://i.imgur.com/zWhWOZh.png")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.schema("name"), new Literal("Bugsweeper")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.ll("npmLabel"), new Literal("link-minesweeper")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.ll("npmVersion"), new Literal("1.0.6")),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.ll("fileTemplate"), template),
  rdfFactory.quad(minesweeper("MinesweeperGame"), NS.ll("newLabel"), new Literal("Create minesweeper game")),

  rdfFactory.quad(template, NS.rdf("type"), minesweeper("MinesweeperInit")),
];
