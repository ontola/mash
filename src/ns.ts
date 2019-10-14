import { createNS, PlainFactory, setup } from "@ontologies/core";
setup(PlainFactory);

import rdf from "@ontologies/rdf";
import schema from "@ontologies/schema";
import { defaultNS } from "link-lib";

import { FRONTEND_URL } from "./helpers/config";

export default {
  ...defaultNS,

  api: createNS(FRONTEND_URL),
  app: createNS(FRONTEND_URL),

  rdf,
  schema,

  dbdt: createNS("http://dbpedia.org/datatype/"),
  dbp: createNS("http://dbpedia.org/property/"),
  dbpediaData: createNS("http://dbpedia.org/data/"),
  ldp: createNS("http://www.w3.org/ns/ldp#"),
  umbelRc: createNS("http://umbel.org/umbel/rc/"),
  vcard: createNS("http://www.w3.org/2006/vcard/ns#"),
  wikibase: createNS("http://wikiba.se/ontology-beta#"),
};
