import rdfFactory, { createNS } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";

const vcardNS = createNS("http://www.w3.org/2006/vcard/ns#");

const languages = {
  en: "en",
  nl: "nl",
};

const properties = {
  countryName: vcardNS("country-name"),
  hasAddress: vcardNS("hasAddress"),
  hasEmail: vcardNS("hasEmail"),
  hasTelephone: vcardNS("hasTelephone"),
  locality: vcardNS("locality"),
  postalCode: vcardNS("postal-code"),
  region: vcardNS("region"),
  streetAddress: vcardNS("street-address"),
  value: vcardNS("value"),
};

const classes = {
  Address: vcardNS("Address"),
  Email: vcardNS("Email"),
  TelephoneType: vcardNS("TelephoneType"),
};

const vcard = {
  ns: vcardNS,

  ...properties,
  ...classes,
};

const classesTypes = Object
  .values(classes)
  .map((p) => rdfFactory.quad(p, rdf.type, rdfs.Class));

const propertyTypes = Object
  .values(properties)
  .map((p) => rdfFactory.quad(p, rdf.type, rdf.Property));

export const vcardOntology = [
  classesTypes,
  propertyTypes,

  rdfFactory.quad(vcard.hasAddress, rdfs.range, vcard.Address),
  rdfFactory.quad(vcard.hasAddress, rdfs.label, rdfFactory.literal("Address", languages.en)),

  rdfFactory.quad(vcard.streetAddress, rdfs.label, rdfFactory.literal("Street address", languages.en)),
  rdfFactory.quad(vcard.region, rdfs.label, rdfFactory.literal("Region", languages.en)),
  rdfFactory.quad(vcard.countryName, rdfs.label, rdfFactory.literal("Country", languages.en)),

  rdfFactory.quad(vcard.region, rdfs.domain, vcard.Address),
  rdfFactory.quad(vcard.hasEmail, rdfs.range, vcard.Email),
  rdfFactory.quad(vcard.hasTelephone, rdfs.range, vcard.TelephoneType),
];

export default vcard;
