import { defaultNS as NS } from "link-lib";
import { Literal, Namespace, Statement } from "rdflib";

const todo = Namespace("https://fletcher91.github.io/link-redux-todo/");

export const todoOntology = [
  new Statement(todo("TodoList"), NS.rdf("type"), NS.rdfs("Class")),
  new Statement(todo("TodoList"), NS.rdf("type"), NS.ll("InstallableComponent")),
  new Statement(todo("TodoList"), NS.schema("name"), new Literal("Demo TODO app")),
  new Statement(todo("TodoList"), NS.ll("npmLabel"), new Literal("link-redux-todomvc")),
  new Statement(todo("TodoList"), NS.ll("npmVersion"), new Literal("2.12.0")),
];
