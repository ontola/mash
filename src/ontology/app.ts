import { defaultNS as NS } from "link-lib";
import { Literal, Namespace, Statement } from "rdflib";
import { FRONTEND_URL } from "../helpers/config";

const languages = {
  en: "en",
  nl: "nl",
};

const app = Namespace(FRONTEND_URL);

export const appOntology = [
  rdfFactory.quad(app("bornInfo"), NS.rdf("type"), NS.rdf("Property")),
  rdfFactory.quad(app("bornInfo"), NS.rdfs("label"), Literal.find("Birth", languages.en)),
  rdfFactory.quad(app("bornInfo"), NS.rdfs("label"), Literal.find("Geboorte", languages.nl)),
];
