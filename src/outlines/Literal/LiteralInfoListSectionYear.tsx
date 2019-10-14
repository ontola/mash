import { Literal } from "@ontologies/core";
import rdfs from "@ontologies/rdfs";
import xsd from "@ontologies/xsd";
import * as React from "react";

import InfoListItemText from "../../components/InfoListItemText";
import { LDLink } from "../../components/LDLink";
import dbpedia from "../../ontology/dbpedia";
import { InfoListSectionTopology } from "../../topologies";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionYear extends React.PureComponent<PropTypes> {
    public static type = rdfs.Literal;

    public static property = xsd.gYear;

    public static topology = InfoListSectionTopology;

    public render() {
        const { linkedProp: { value } } = this.props;
        const literal = Number(this.props.linkedProp.value);

        return (
            <InfoListItemText>
                <LDLink to={dbpedia.ns(value)}>
                    {literal}
                </LDLink>
            </InfoListItemText>
        );
    }
}
