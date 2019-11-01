import { PlainFactory, setup } from "@ontologies/core";
import { DataFactory } from "rdflib";

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

  if (id.startsWith("<")) {
    return this.namedNode(id.slice("<".length, -1));
  } else if (id.startsWith("_")) {
    return this.blankNode(id.slice("_:".length, -1));
  } else if (id.startsWith('"')) {
    const [ valueOrLang, datatype ] = id.split("^^");
    const [ value, lang ] = valueOrLang.split("@");

    return this.literal(value, lang || this.namedNode(datatype));
  }

  throw new Error(`Cannot revert '${id}' back to value`);
};

RDFLibFactory.fromId = RDFLibFactory.fromId.bind(RDFLibFactory);

setup(RDFLibFactory);
