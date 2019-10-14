import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";

import { FRONTEND_URL } from "../helpers/config";

const languages = {
  en: "en",
  nl: "nl",
};

const app = createNS(FRONTEND_URL);

export const appOntology = [
  rdfFactory.quad(app("bornInfo"), rdf.type, rdf.Property),
  rdfFactory.quad(app("bornInfo"), rdfs.label, rdfFactory.literal("Birth", languages.en)),
  rdfFactory.quad(app("bornInfo"), rdfs.label, rdfFactory.literal("Geboorte", languages.nl)),
];

export default {
  ns: app,
};
