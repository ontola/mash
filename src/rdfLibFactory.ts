import { PlainFactory, setup } from "@ontologies/core";
import { DataFactory } from "rdflib";
import { termFromNQ } from "./helpers/data";

const plainFactory = new PlainFactory({ supports: DataFactory.supports });
const RDFLibFactory = Object.create(DataFactory);

const extendedMethods = [
  "isQuad",
  "qdrFromQdr",
  "qdrFromQuad",
  "quadruple",
  "fromQdr",
  "equals",
  "termToNQ",
  "toNQ",
];

for (const method of extendedMethods) {
  RDFLibFactory[method] = plainFactory[method].bind(RDFLibFactory);
}

RDFLibFactory.fromId = function fromId(id: string) {
  if (typeof id !== "string") {
    return id;
  }

  const parsed = termFromNQ(id, this);
  if (!parsed) {
    throw new Error(`Cannot revert '${id}' back to value`);
  }

  return parsed;
};

RDFLibFactory.fromId = RDFLibFactory.fromId.bind(RDFLibFactory);

setup(RDFLibFactory);
