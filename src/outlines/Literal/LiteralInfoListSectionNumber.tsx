import { Literal } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../topologies";
import InfoListItemText from "../../components/InfoListItemText";
import { NS } from "../../LRS";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionNumber extends React.PureComponent<PropTypes> {
    public static type = NS.rdfs("Literal");

    public static property = [
        NS.xsd("decimal"),
        NS.xsd("integer"),
        NS.xsd("nonNegativeInteger"),
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
