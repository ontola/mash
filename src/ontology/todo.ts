import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

import ll from "./ll";

const todo = createNS("https://fletcher91.github.io/link-redux-todo/");

const template = rdfFactory.blankNode();

export const todoOntology = [
  rdfFactory.quad(todo("TodoList"), rdf.type, rdfs.Class, todo("TodoList")),
  rdfFactory.quad(todo("TodoList"), rdf.type, ll.ns("InstallableComponent"), todo("TodoList")),
  rdfFactory.quad(todo("TodoList"), schema.image, rdfFactory.namedNode("https://material.io/resources/icons/list")),
  rdfFactory.quad(todo("TodoList"), schema.logo, rdfFactory.namedNode("http://todomvc.com/site-assets/logo.svg")),
  rdfFactory.quad(todo("TodoList"), schema.name, rdfFactory.literal("TODO List")),
  rdfFactory.quad(todo("TodoList"), ll.ns("npmLabel"), rdfFactory.literal("link-redux-todomvc")),
  rdfFactory.quad(todo("TodoList"), ll.ns("npmVersion"), rdfFactory.literal("2.12.5")),
  rdfFactory.quad(todo("TodoList"), ll.ns("fileTemplate"), template),
  rdfFactory.quad(todo("TodoList"), ll.ns("newLabel"), rdfFactory.literal("Create TODO List")),

  rdfFactory.quad(template, rdf.type, todo("TodoList")),
  // The view will not render without either one of name, completedCount, or member, since it's wrapped in
  // mapDataToProps without forceRender, or, in other words, it doesn't support empty files yet.
  rdfFactory.quad(template, todo("completedCount"), rdfFactory.literal(0)),
  rdfFactory.quad(template, schema.name, rdfFactory.literal("")),
];
