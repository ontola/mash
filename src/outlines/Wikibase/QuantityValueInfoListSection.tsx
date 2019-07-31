import * as Qty from "js-quantities";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import InfoListItemText from "../../components/InfoListItemText";
import { NS } from "../../LRS";

// interface PropTypes extends LinkContext {
//     quantityAmount: LinkedPropType;
//     quantityLowerBound: LinkedPropType;
//     quantityNormalized: LinkedPropType;
//     quantityUnit: NamedNode;
//     quantityUpperBound: LinkedPropType;
// }

export const QuantityValueInfoListSection = ({
  quantityAmount,
  quantityUnit,
}) => {
    const literal = Number(quantityAmount.value);
    let value = isNaN(literal) ? quantityAmount.value : literal.toString();

    const unit = this.props.lrs.getResourceProperty(quantityUnit, NS.wdt("P5061"));

    if (unit) {
        value = new Qty(literal, unit.value).toString();
    }

    return (
        <InfoListItemText>
            <LinkedResourceContainer subject={quantityUnit}>
                {value}
            </LinkedResourceContainer>
        </InfoListItemText>
    );
};

QuantityValueInfoListSection.type = NS.wikibase("QuantityValue");

QuantityValueInfoListSection.topology = InfoListSectionTopology;

QuantityValueInfoListSection.mapDataToProps = [
    NS.wikibase("quantityAmount"),
    NS.wikibase("quantityLowerBound"),
    NS.wikibase("quantityNormalized"),
    NS.wikibase("quantityUnit"),
    NS.wikibase("quantityUpperBound"),
];

QuantityValueInfoListSection.linkOpts = { forceRender: true };
