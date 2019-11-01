/**
 * Since a lot of concepts (whether actually the same or similar enough to be rendered the same way)
 * have different IRI's in multiple ontologies, it's useful to bundle them so they can be re-used
 * across files.
 */

import rdfFactory, { NamedNode } from "@ontologies/core";
import foaf from "@ontologies/foaf";
import owl from "@ontologies/owl";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

import browser from "../ontology/browser";
import dbo from "../ontology/dbo";
import link from "../ontology/link";
import umbelRc from "../ontology/umbelRc";
import vcard from "../ontology/vcard";
import wde from "../ontology/wde";
import wdp from "../ontology/wdp";
import wdt from "../ontology/wdt";
import wikibase from "../ontology/wikibase";

/**
 * Types
 */
/** Basic type for things/resources. */
export const ThingTypes = [schema.Thing, owl.Thing, wikibase.ns("Item")];
/** Basic type for people. */
export const PersonTypes = [schema.Person, foaf.Person, dbo.ns("Person"), wde.ns("Q5")];
/** Basic type for places */
export const PlaceTypes = [schema.Place, dbo.ns("Place")];
/** Property types */
export const PropertyTypes = [rdf.Property, owl.DatatypeProperty, owl.ObjectProperty];
/** Types for educational institutions (including their specializations) */
export const EducationalInstitutionTypes = [
    schema.CollegeOrUniversity,
    dbo.ns("University"),
    umbelRc.ns("University"),
    schema.EducationalOrganization,
    dbo.ns("EducationalInstitution"),
    umbelRc.ns("EducationalOrganization"),
];
/** Basic type for (commercial) companies */
export const CompanyTypes = [dbo.ns("Company"), schema.Organization];

/** Subclasses of things which are implemented */
const OtherImplementedTypes = [
    dbo.ns("CareerStation"),
    schema.Dataset,
    rdfs.Container,
    rdf.Bag,
    rdf.Seq,
    browser.ns("BookmarksList"),
    rdfFactory.namedNode("http://wikiba.se/ontology-beta#Item"),
];

export const CatchAllTypes = [
    rdfs.Resource,
    link.ns("Document"),
    link.ns("RDFDocument"),
    ...ThingTypes,
    ...PersonTypes,
];

/**
 * Properties
 */

export const NameProps = [
  schema.name,
  dbo.ns("name"),
  foaf.name,
  rdfs.label,
  vcard.ns("fn"),
];
export const DescriptionProps = [
  schema.description,
  vcard.ns("note"),
];
export const TextProps = [dbo.ns("abstract"), schema.text, rdfs.comment];
export const ImageProps = [
  foaf.depiction,
  schema.image,
  wdp.ns("P18"),
  vcard.ns("hasPhoto"),
];

export const BirthPlaceProps = [dbo.ns("birthPlace"), wdt.ns("P19")];
export const GenderProps = [foaf.gender, wdt.ns("P21")];
export const HeightProps = [dbo.ns("Person/height"), wdp.ns("P2048")];
export const SpouseProps = [dbo.ns("spouse"), wdt.ns("P26")];

/**
 * Ontological data
 *
 * In order to have our views render properly according to the inheritance tree, we need to add some
 * ontological information. It'd be better to get this from some proper data source, but ad-hoc is
 * easier and gives us more control.
 */

function subClass(subTypes: NamedNode[], superTypes: NamedNode[]) {
    return [].concat.apply([], subTypes.map(
        (sub) => superTypes.map(
            (sup) => rdfFactory.quad(sub, rdfs.subClassOf, sup),
        ),
    ));
}

function markAs(subjects: NamedNode[], type: NamedNode) {
    return subjects.map(
        (s) => rdfFactory.quad(s, rdf.type, type),
    );
}

const allThingsAreResources = subClass(ThingTypes, [rdfs.Resource]);
const everyThingIsAResource = markAs(ThingTypes, rdfs.Resource);
const thingsAreClasses = markAs(ThingTypes, rdfs.Class);
const personsAreClasses = markAs(PersonTypes, rdfs.Class);
const personIsThing = subClass(PersonTypes, ThingTypes);
const placeIsThing = subClass(PlaceTypes, ThingTypes);
const educationInstitutionsAreThings = subClass(EducationalInstitutionTypes, ThingTypes);
const mostThingsAreThings = subClass(OtherImplementedTypes, ThingTypes);

export default [
    ...allThingsAreResources,
    ...everyThingIsAResource,
    ...thingsAreClasses,
    ...personsAreClasses,
    ...personIsThing,
    ...placeIsThing,
    ...educationInstitutionsAreThings,
    ...mostThingsAreThings,
];
