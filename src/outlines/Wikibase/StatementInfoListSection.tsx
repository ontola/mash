import { TermType } from "@ontologies/core";
import prov from "@ontologies/prov";
import rdf from "@ontologies/rdf";
import { normalizeType, rdflib } from "link-lib";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import wdp from "../../ontology/wdp";
import wikibase from "../../ontology/wikibase";
import { InfoListSectionTopology } from "../../topologies";

function getWikiDataIDFromIRI(iri: string): string {
    return iri.split("/").pop();
}

export const StatementInfoListSection = ({ label }) => {
    const wikibase = normalizeType(label).find((l) => l.value.startsWith(StatementInfoListSection.wikiBaseURI));

    if (!wikibase) {
        throw new Error("Wikibase statement rendered without accompanying prop as label");
    }

    const id = getWikiDataIDFromIRI(wikibase.value);
    const qualifierProp = wdp.ns(`statement/value/${id}`);
    const qualifierResource = this.getLinkedObjectProperty(qualifierProp);

    if (qualifierResource.termType === TermType.Literal || qualifierResource.termType === "Collection") {
        throw new Error("Non-node wikidata qualifiers aren't supported");
    }

    return (
      <LinkedResourceContainer subject={qualifierResource} />
    );
};

StatementInfoListSection.wikiBaseURI = rdflib.site(wdp.ns("")).value;

StatementInfoListSection.type = wikibase.ns("Statement");

StatementInfoListSection.topology = InfoListSectionTopology;

StatementInfoListSection.mapDataToProps = {
    type: rdf.type,
    wasDerivedFrom: prov.wasDerivedFrom,
};

StatementInfoListSection.linkOpts = { forceRender: true };
