import { normalizeType } from "link-lib";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { InfoListSectionTopology } from "../../topologies";
import { NS } from "../../LRS";

function getWikiDataIDFromIRI(iri: string): string {
    return iri.split("/").pop();
}

export const StatementInfoListSection = ({ label }) => {
    const wikibase = normalizeType(label).find((l) => l.value.startsWith(StatementInfoListSection.wikiBaseURI));

    if (!wikibase) {
        throw new Error("Wikibase statement rendered without accompanying prop as label");
    }

    const id = getWikiDataIDFromIRI(wikibase.value);
    const qualifierProp = NS.p(`statement/value/${id}`);
    const qualifierResource = this.getLinkedObjectProperty(qualifierProp);

    if (qualifierResource.termType === "Literal" || qualifierResource.termType === "Collection") {
        throw new Error("Non-node wikidata qualifiers aren't supported");
    }

    return (
      <LinkedResourceContainer subject={qualifierResource} />
    );
};

StatementInfoListSection.wikiBaseURI = NS.p("").site().value;

StatementInfoListSection.type = NS.wikibase("Statement");

StatementInfoListSection.topology = InfoListSectionTopology;

StatementInfoListSection.mapDataToProps = [NS.rdf("type"), NS.prov("wasDerivedFrom")];

StatementInfoListSection.linkOpts = { forceRender: true };
