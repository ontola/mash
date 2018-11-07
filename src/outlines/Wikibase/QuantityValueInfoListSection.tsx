import * as Qty from "js-quantities";
import {
    LinkContext,
    LinkedPropType,
    LinkedResourceContainer,
    PropertyBase,
} from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import InfoListItemText from "../../components/InfoListItemText";
import { NS } from "../../LRS";

interface PropTypes extends LinkContext {
    quantityAmount: LinkedPropType;
    quantityLowerBound: LinkedPropType;
    quantityNormalized: LinkedPropType;
    quantityUnit: NamedNode;
    quantityUpperBound: LinkedPropType;
}

export class QuantityValueInfoListSection extends PropertyBase<PropTypes> {
    public static type = NS.wikibase("QuantityValue");

    public static topology = InfoListSectionTopology;

    public static mapDataToProps = [
        NS.wikibase("quantityAmount"),
        NS.wikibase("quantityLowerBound"),
        NS.wikibase("quantityNormalized"),
        NS.wikibase("quantityUnit"),
        NS.wikibase("quantityUpperBound"),
    ];

    public static linkOpts = { forceRender: true };

    public shouldComponentUpdate() {
        return true;
    }

    public render() {
        const {
            quantityAmount,
            quantityUnit,
        } = this.props;

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
    }
}
