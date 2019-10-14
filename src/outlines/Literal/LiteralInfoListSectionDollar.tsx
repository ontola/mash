import { Literal } from "@ontologies/core";
import rdfs from "@ontologies/rdfs";
import * as numeral from "numeral";
import * as React from "react";

import InfoListItemText from "../../components/InfoListItemText";
import dbdt from "../../ontology/dbdt";
import { InfoListSectionTopology } from "../../topologies";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionDollar extends React.PureComponent<PropTypes> {
    public static type = rdfs.Literal;

    public static property = dbdt.ns("usDollar");

    public static topology = InfoListSectionTopology;

    public render() {
        const literal = Number(this.props.linkedProp.value);
        const quantity = numeral(`$${literal}`);

        return (
            <InfoListItemText>
                ${quantity.format()}
            </InfoListItemText>
        );
    }
}
