/**
 * Since a lot of concepts (whether actually the same or similar enough to be rendered the same way)
 * have different IRI's in multiple ontologies, it's useful to bundle them so they can be re-used
 * across files.
 */

import { namedNodeByIRI } from "link-lib";
import { NamedNode, Statement } from "rdflib";
import { LRS, NS } from "../LRS";

/**
 * Types
 */
/** Basic type for things/resources. */
export const ThingTypes = [NS.schema("Thing"), NS.owl("Thing"), NS.wikibase("Item")];
/** Basic type for people. */
export const PersonTypes = [NS.schema("Person"), NS.foaf("Person"), NS.dbo("Person"), NS.wd("Q5")];
/** Basic type for places */
export const PlaceTypes = [NS.schema("Place"), NS.dbo("Place")];
/** Property types */
export const PropertyTypes = [NS.rdf("Property"), NS.owl("DatatypeProperty")];
/** Types for educational institutions (including their specializations) */
export const EducationalInstitutionTypes = [
    NS.schema("CollegeOrUniversity"),
    NS.dbo("University"),
    NS.umbelRc("University"),
    NS.schema("EducationalOrganization"),
    NS.dbo("EducationalInstitution"),
    NS.umbelRc("EducationalOrganization"),
];
/** Basic type for (commercial) companies */
export const CompanyTypes = [NS.dbo("Company"), NS.schema("Organization")];

/** Subclasses of things which are implemented */
const OtherImplementedTypes = [
    NS.dbo("CareerStation"),
    NS.schema("DataSet"),
    namedNodeByIRI("http://wikiba.se/ontology-beta#Item"),
];

export const CatchAllTypes = [
    NS.rdfs("Resource"),
    NS.link("Document"),
    NS.link("RDFDocument"),
    ...ThingTypes,
    ...PersonTypes,
];

/**
 * Properties
 */

export const NameProps = [NS.schema("name"), NS.dbo("name"), NS.foaf("name"), NS.rdfs("label")];
export const TextProps = [NS.dbo("abstract"), NS.schema("text"), NS.rdfs("comment")];
export const ImageProps = [NS.foaf("depiction"), NS.schema("image"), NS.p("P18")];

export const BirthPlaceProps = [NS.dbo("birthPlace"), NS.wdt("P19")];
export const GenderProps = [NS.foaf("gender"), NS.wdt("P21")];
export const HeightProps = [NS.dbo("Person/height"), NS.p("P2048")];
export const SpouseProps = [NS.dbo("spouse"), NS.wdt("P26")];

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
            (sup) => new Statement(sub, NS.rdfs("subClassOf"), sup),
        ),
    ));
}

function markAs(subjects: NamedNode[], type: NamedNode) {
    return subjects.map(
        (s) => new Statement(s, NS.rdfs("type"), type),
    );
}

const allThingsAreResources = subClass(ThingTypes, [NS.rdfs("Resource")]);
const everyThingIsAResource = markAs(ThingTypes, NS.rdfs("Resource"));
const thingsAreClasses = markAs(ThingTypes, NS.rdfs("Class"));
const personsAreClasses = markAs(PersonTypes, NS.rdfs("Class"));
const personIsThing = subClass(PersonTypes, ThingTypes);
const placeIsThing = subClass(PlaceTypes, ThingTypes);
const mostThingsAreThings = subClass(OtherImplementedTypes, ThingTypes);

LRS.addOntologySchematics([
    ...allThingsAreResources,
    ...everyThingIsAResource,
    ...thingsAreClasses,
    ...personsAreClasses,
    ...personIsThing,
    ...placeIsThing,
    ...mostThingsAreThings,
]);
