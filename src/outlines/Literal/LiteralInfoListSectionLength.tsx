import rdfFactory, { Literal } from "@ontologies/core";
import rdfs from "@ontologies/rdfs";
import * as Qty from "js-quantities";
import * as React from "react";

import InfoListItemText from "../../components/InfoListItemText";
import { InfoListSectionTopology } from "../../topologies";

interface PropTypes {
    linkedProp: Literal;
}

export class LiteralInfoListSectionLength extends React.PureComponent<PropTypes> {
    public static type = rdfs.Literal;

    public static property = [
        rdfFactory.namedNode("http://dbpedia.org/datatype/centimetre"),
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
