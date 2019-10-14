import { Literal } from "@ontologies/core";
import rdfs from "@ontologies/rdfs";
import xsd from "@ontologies/xsd";
import * as React from "react";

import InfoListItemText from "../../components/InfoListItemText";
import { InfoListSectionTopology } from "../../topologies";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionNumber extends React.PureComponent<PropTypes> {
    public static type = rdfs.Literal;

    public static property = [
        xsd.decimal,
        xsd.integer,
        xsd.nonNegativeInteger,
    ];

    public static topology = InfoListSectionTopology;

    public render() {
        const { linkedProp: { value } } = this.props;

        const literal = Number(value);

        return (
            <InfoListItemText>
                {literal}
            </InfoListItemText>
        );
    }
}
