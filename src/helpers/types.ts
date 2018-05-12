/**
 * Since a lot of concepts (whether actually the same or similar enough to be rendered the same way)
 * have different IRI's in multiple ontologies, it's useful to bundle them so they can be re-used
 * across files.
 */

import { NamedNode, Statement } from "rdflib";
import { LRS, NS } from "../LRS";

/**
 * Types
 */

/** Basic type for things/resources. */
export const ThingTypes = [NS.schema("Thing"), NS.owl("Thing"), NS.rdfs("Resource"), NS.link("Document")];
/** Basic type for people. */
export const PersonTypes = [NS.schema("Person"), NS.foaf("Person"), NS.dbo("Person")];
/** Basic type for places */
export const PlaceTypes = [NS.schema("Place"), NS.dbo("Place")];

/** Subclasses of things which are implemented */
const OtherImplementedTypes = [
    NS.dbo("CareerStation"),
];

/**
 * Properties
 */

export const NameTypes = [NS.schema("name"), NS.dbo("name"), NS.foaf("name"), NS.rdfs("label")];
export const TextTypes = [NS.dbo("abstract"), NS.schema("text"), NS.rdfs("comment")];
export const ImageTypes = [NS.foaf("depiction"), NS.schema("image")];

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

const thingsAreClasses = markAs(ThingTypes, NS.rdfs("Class"));
const personsAreClasses = markAs(PersonTypes, NS.rdfs("Class"));
const personIsThing = subClass(PersonTypes, ThingTypes);
const placeIsThing = subClass(PlaceTypes, ThingTypes);
const mostThingsAreThings = subClass(OtherImplementedTypes, ThingTypes);

LRS.addOntologySchematics([
    ...thingsAreClasses,
    ...personsAreClasses,
    ...personIsThing,
    ...placeIsThing,
    ...mostThingsAreThings,
]);
