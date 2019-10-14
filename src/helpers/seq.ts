import { NamedNode, Node, Quad, Term } from "@ontologies/core";
import rdfs from "@ontologies/rdfs";
import { LinkedRenderStore } from "link-lib";

/**
 * Parses the numerical value of a rdfs:ContainerMembershipProperty predicate.
 *
 * @see https://www.w3.org/TR/rdf-schema/#ch_containermembershipproperty
 * @return The value of the predicate or -1.
 */
export function seqMemberToNumber(member: NamedNode | undefined): number {
  return Number(member?.value?.split("_")?.pop() || -1);
}

export function orderedElementsOfSeq(store: LinkedRenderStore<any>, seqIRI: Node): Quad[] {
  return store
    .getResourcePropertyRaw(seqIRI, rdfs.member)
    .sort((a, b) => seqMemberToNumber(a.predicate) - seqMemberToNumber(b.predicate));
}

export function seqToArr(store: LinkedRenderStore<any>, seqIRI: Node): Term[] {
  return orderedElementsOfSeq(store, seqIRI).map((s) => s.object);
}

export function firstElementOfSeq(store: LinkedRenderStore<any>, seqIRI: Node): Quad | undefined {
  return orderedElementsOfSeq(store, seqIRI).pop();
}

export function lastElementOfSeq(store: LinkedRenderStore<any>, seqIRI: Node): Quad | undefined {
  return orderedElementsOfSeq(store, seqIRI).pop();
}
