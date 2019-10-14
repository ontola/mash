import * as Qty from "js-quantities";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import InfoListItemText from "../../components/InfoListItemText";
import wdt from "../../ontology/wdt";
import wikibase from "../../ontology/wikibase";
import { InfoListSectionTopology } from "../../topologies";

export const QuantityValueInfoListSection = ({
  quantityAmount,
  quantityUnit,
}) => {
    const literal = Number(quantityAmount.value);
    let value = isNaN(literal) ? quantityAmount.value : literal.toString();

    const unit = this.props.lrs.getResourceProperty(quantityUnit, wdt.ns("P5061"));

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

QuantityValueInfoListSection.type = wikibase.ns("QuantityValue");

QuantityValueInfoListSection.topology = InfoListSectionTopology;

QuantityValueInfoListSection.mapDataToProps = {
    quantityAmount: wikibase.ns("quantityAmount"),
    quantityLowerBound: wikibase.ns("quantityLowerBound"),
    quantityNormalized: wikibase.ns("quantityNormalized"),
    quantityUnit: wikibase.ns("quantityUnit"),
    quantityUpperBound: wikibase.ns("quantityUpperBound"),
};

QuantityValueInfoListSection.linkOpts = { forceRender: true };
