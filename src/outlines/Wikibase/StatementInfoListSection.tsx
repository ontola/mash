import { normalizeType, SomeNode } from "link-lib";
import { LinkContextReceiverProps, LinkedResourceContainer, PropertyBase } from "link-redux";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import { NS } from "../../LRS";

interface PropTypes extends LinkContextReceiverProps {
    label: SomeNode | SomeNode[];
}

function getWikiDataIDFromIRI(iri: string): string {
    return iri.split("/").pop();
}

export class StatementInfoListSection extends PropertyBase<PropTypes> {
    public static wikiBaseURI = NS.p("").site().value;

    public static type = NS.wikibase("Statement");
    public static topology = InfoListSectionTopology;
    public static mapDataToProps = [NS.rdf("type"), NS.prov("wasDerivedFrom")];
    public static linkOpts = { forceRender: true };

    public render() {
        const { label } = this.props;

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
    }
}
