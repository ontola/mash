import { Literal } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import InfoListItemText from "../../components/InfoListItemText";
import LDLink from "../../components/LDLink";
import { NS } from "../../LRS";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionYear extends React.PureComponent<PropTypes> {
    public static type = NS.rdfs("Literal");

    public static property = NS.xsd("gYear");

    public static topology = InfoListSectionTopology;

    public render() {
        const { linkedProp: { value } } = this.props;
        const literal = Number(this.props.linkedProp.value);

        return (
            <InfoListItemText>
                <LDLink to={NS.dbpedia(value)}>
                    {literal}
                </LDLink>
            </InfoListItemText>
        );
    }
}
