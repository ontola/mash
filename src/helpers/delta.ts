import rdfFactory, { NamedNode, Node, Quad, Term } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { LinkedRenderStore } from "link-lib";

import ld from "../ontology/ld";
import { firstElementOfSeq, lastElementOfSeq, seqMemberToNumber } from "./seq";

export const addGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "add" : `add?graph=${encodeURIComponent(graph.value)}`);
export const replaceGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "replace" : `replace?graph=${encodeURIComponent(graph.value)}`);
export const sliceGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "slice" : `slice?graph=${encodeURIComponent(graph.value)}`);
export const purgeGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "purge" : `purge?graph=${encodeURIComponent(graph.value)}`);
export const removeGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "remove" : `remove?graph=${encodeURIComponent(graph.value)}`);
export const supplantGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "supplant" : `supplant?graph=${encodeURIComponent(graph.value)}`);

/**
 * Create a delta statement adding ({s}, {p}, {o}) to {g} or the default graph
 */
export const add = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, addGraph(g));
/**
 * Create a delta statement replaceing ({s}, {p}, {o}) to {g} or the default graph
 */
export const replace = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, replaceGraph(g));
/**
 * Create a delta statement sliceing ({s}, {p}, {o}) to {g} or the default graph
 */
export const slice = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, sliceGraph(g));
/**
 * Create a delta statement purgeing ({s}, {p}, {o}) to {g} or the default graph
 */
export const purge = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, purgeGraph(g));
/**
 * Create a delta statement removeing ({s}, {p}, {o}) to {g} or the default graph
 */
export const remove = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, removeGraph(g));
/**
 * Create a delta statement supplanting ({s}, {p}, {o}) to {g} or the default graph
 */
export const supplant = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, supplantGraph(g));

export function seqUnshift(
  store: LinkedRenderStore<any>,
  seqIRI: Node,
  method: NamedNode = ld.slice,
): Quad[] {
  const firstMember = firstElementOfSeq(store, seqIRI);

  return [
    rdfFactory.quad(
      firstMember.subject,
      firstMember.predicate,
      firstMember.object,
      method,
    ),
  ];
}

export function seqPush(
  store: LinkedRenderStore<any>,
  seqIRI: Node,
  value: Term,
  method: NamedNode = ld.replace,
) {
  const upperBound = Number(seqMemberToNumber(lastElementOfSeq(store, seqIRI)?.predicate));

  return [
    rdfFactory.quad(
      seqIRI,
      rdf.ns(`_${upperBound + 1}`),
      value,
      method,
    ),
  ];
}
