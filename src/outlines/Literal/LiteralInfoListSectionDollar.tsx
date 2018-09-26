import { Literal } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import InfoListItemText from "../../components/InfoListItemText";
import { NS } from "../../LRS";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionDollar extends React.PureComponent<PropTypes> {
    public static type = NS.rdfs("Literal");

    public static property = NS.dbdt("usDollar");

    public static topology = InfoListSectionTopology;

    public render() {
        const literal = Number(this.props.linkedProp.value);

        return (
            <InfoListItemText>
                ${literal}
            </InfoListItemText>
        );
    }
}
