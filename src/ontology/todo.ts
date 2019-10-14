import { defaultNS as NS } from "link-lib";
import { BlankNode, Literal, NamedNode, Namespace, Statement } from "rdflib";

const todo = Namespace("https://fletcher91.github.io/link-redux-todo/");

const template = new BlankNode();

export const todoOntology = [
  rdfFactory.quad(todo("TodoList"), NS.rdf("type"), NS.rdfs("Class"), todo("TodoList")),
  rdfFactory.quad(todo("TodoList"), NS.rdf("type"), NS.ll("InstallableComponent"), todo("TodoList")),
  rdfFactory.quad(todo("TodoList"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/list")),
  rdfFactory.quad(todo("TodoList"), NS.schema("logo"), new NamedNode("http://todomvc.com/site-assets/logo.svg")),
  rdfFactory.quad(todo("TodoList"), NS.schema("name"), new Literal("TODO List")),
  rdfFactory.quad(todo("TodoList"), NS.ll("npmLabel"), new Literal("link-redux-todomvc")),
  rdfFactory.quad(todo("TodoList"), NS.ll("npmVersion"), new Literal("2.12.5")),
  rdfFactory.quad(todo("TodoList"), NS.ll("fileTemplate"), template),
  rdfFactory.quad(todo("TodoList"), NS.ll("newLabel"), new Literal("Create TODO List")),

  rdfFactory.quad(template, NS.rdf("type"), todo("TodoList")),
  // The view will not render without either one of name, completedCount, or member, since it's wrapped in
  // mapDataToProps without forceRender, or, in other words, it doesn't support empty files yet.
  rdfFactory.quad(template, todo("completedCount"), Literal.fromNumber(0)),
  rdfFactory.quad(template, NS.schema("name"), new Literal("")),
];
