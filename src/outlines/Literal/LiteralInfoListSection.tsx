import { Literal } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import InfoListItemText from "../../components/InfoListItemText";
import { NS } from "../../LRS";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSection extends React.PureComponent<PropTypes> {
    public static type = NS.rdfs("Literal");

    public static property = [
        NS.rdf("langString"),
        NS.xsd("string"),
    ];

    public static topology = InfoListSectionTopology;

    public render() {
        return (
            <InfoListItemText>
                {this.props.linkedProp.value}
            </InfoListItemText>
        );
    }
}
