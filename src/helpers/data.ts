import rdfFactory, { SomeTerm } from "@ontologies/core";

export function groupBy(list: any[], keyGetter) {
  const map = new Map();
  for (const item of list) {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  }
  return map;
}

export function termFromNQ(nq: string, factory = rdfFactory): SomeTerm | undefined {
  if (nq.startsWith("<")) {
    return factory.namedNode(nq.slice("<".length, -1));
  } else if (nq.startsWith("_")) {
    return factory.blankNode(nq.slice("_:".length, -1));
  } else if (nq.startsWith('"')) {
    const [ valueOrLang, datatype ] = nq.split("^^");
    const [ value, lang ] = valueOrLang.split("@");

    return factory.literal(value, lang || factory.namedNode(datatype));
  }
}
