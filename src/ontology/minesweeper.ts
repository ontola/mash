import { defaultNS as NS } from "link-lib";
import { BlankNode, Literal, NamedNode, Namespace, Statement } from "rdflib";

const minesweeper = Namespace("https://fletcher91.github.io/link-minesweeper/");

const template = new BlankNode();

export const minesweeperOntology = [
  new Statement(minesweeper("MinesweeperGame"), NS.rdf("type"), NS.rdfs("Class"), minesweeper("MinesweeperGame")),
  new Statement(minesweeper("MinesweeperGame"), NS.rdf("type"), NS.ll("InstallableComponent"), minesweeper("MinesweeperGame")),
  new Statement(minesweeper("MinesweeperGame"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/bug_report")),
  new Statement(minesweeper("MinesweeperGame"), NS.schema("logo"), new NamedNode("https://i.imgur.com/zWhWOZh.png")),
  new Statement(minesweeper("MinesweeperGame"), NS.schema("name"), new Literal("Bugsweeper")),
  new Statement(minesweeper("MinesweeperGame"), NS.ll("npmLabel"), new Literal("link-minesweeper")),
  new Statement(minesweeper("MinesweeperGame"), NS.ll("npmVersion"), new Literal("1.0.6")),
  new Statement(minesweeper("MinesweeperGame"), NS.ll("fileTemplate"), template),
  new Statement(minesweeper("MinesweeperGame"), NS.ll("newLabel"), new Literal("Create minesweeper game")),

  new Statement(template, NS.rdf("type"), minesweeper("MinesweeperInit")),
];
