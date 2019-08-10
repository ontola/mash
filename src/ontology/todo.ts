import { defaultNS as NS } from "link-lib";
import { BlankNode, Literal, NamedNode, Namespace, Statement } from "rdflib";

const todo = Namespace("https://fletcher91.github.io/link-redux-todo/");

const template = new BlankNode();

export const todoOntology = [
  new Statement(todo("TodoList"), NS.rdf("type"), NS.rdfs("Class"), todo("TodoList")),
  new Statement(todo("TodoList"), NS.rdf("type"), NS.ll("InstallableComponent"), todo("TodoList")),
  new Statement(todo("TodoList"), NS.schema("image"), new NamedNode("https://material.io/resources/icons/list")),
  new Statement(todo("TodoList"), NS.schema("logo"), new NamedNode("http://todomvc.com/site-assets/logo.svg")),
  new Statement(todo("TodoList"), NS.schema("name"), new Literal("TODO List")),
  new Statement(todo("TodoList"), NS.ll("npmLabel"), new Literal("link-redux-todomvc")),
  new Statement(todo("TodoList"), NS.ll("npmVersion"), new Literal("2.12.5")),
  new Statement(todo("TodoList"), NS.ll("fileTemplate"), template),
  new Statement(todo("TodoList"), NS.ll("newLabel"), new Literal("Create TODO List")),

  new Statement(template, NS.rdf("type"), todo("TodoList")),
  // The view will not render without either one of name, completedCount, or member, since it's wrapped in
  // mapDataToProps without forceRender, or, in other words, it doesn't support empty files yet.
  new Statement(template, todo("completedCount"), Literal.fromNumber(0)),
  new Statement(template, NS.schema("name"), new Literal("")),
];
