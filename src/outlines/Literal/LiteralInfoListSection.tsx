import { Literal } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import xsd from "@ontologies/xsd";
import * as React from "react";

import InfoListItemText from "../../components/InfoListItemText";
import { InfoListSectionTopology } from "../../topologies";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSection extends React.PureComponent<PropTypes> {
    public static type = rdfs.Literal;

    public static property = [
        rdf.langString,
        xsd.string,
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
