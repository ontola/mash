import * as Qty from "js-quantities";
import { namedNodeByIRI } from "link-lib";
import { Literal } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import InfoListItemText from "../../components/InfoListItemText";
import { NS } from "../../LRS";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionLength extends React.PureComponent<PropTypes> {
    public static type = NS.rdfs("Literal");

    public static property = [
        namedNodeByIRI("http://dbpedia.org/datatype/centimetre"),
    ];

    public static topology = InfoListSectionTopology;

    public render() {
        const { linkedProp: { value } } = this.props;

        const literal = Number(value);
        const quantity = Number.isNaN(literal) ? new Qty(value) : new Qty(literal, "cm");

        return (
            <InfoListItemText>
                {quantity.toString()}
            </InfoListItemText>
        );
    }
}
