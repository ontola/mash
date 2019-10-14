import ll from "../ontology/ll";

import rdfFactory, { NamedNode, Node, Quad, Term } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { LinkedRenderStore } from "link-lib";

import ld from "../ontology/ld";
import { firstElementOfSeq, lastElementOfSeq, seqMemberToNumber } from "./seq";

export const addGraph = (graph) => ll.ns(`add?graph=${encodeURIComponent(graph.value)}`);
export const replaceGraph = (graph) => ll.ns(`replace?graph=${encodeURIComponent(graph.value)}`);
export const sliceGraph = (graph) => ll.ns(`slice?graph=${encodeURIComponent(graph.value)}`);
export const purgeGraph = (graph) => ll.ns(`purge?graph=${encodeURIComponent(graph.value)}`);
export const removeGraph = (graph) => ll.ns(`remove?graph=${encodeURIComponent(graph.value)}`);

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
