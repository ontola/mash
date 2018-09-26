import { normalizeType } from "link-lib";
import { NamedNode } from "rdflib";
import * as React from "react";

import { InfoListItem } from "../../canvasses/InfoList/InfoListItem";
import { InfoListSectionTopology } from "../../canvasses/InfoList/InfoListSection";
import InfoListItemLabel from "../../components/InfoListItemLabel";
import { ImageProps } from "../../helpers/types";
import { NS } from "../../LRS";

import { ArticleBase } from "./ArticleBase";

interface LabelProp {
    label: NamedNode | NamedNode[];
}

const BLACKLIST = ImageProps;

export class ThingInfoListSectionProperty extends ArticleBase<LabelProp> {
    public static property = NS.rdf("predicate");

    public static topology = InfoListSectionTopology;

    public render() {
        const { children, label } = this.props;

        const labelArr = normalizeType(label);
        if (BLACKLIST.find((value) => -1 !== labelArr.indexOf(value))) {
            return children;
        }

        const labelValue = label && labelArr[0].term;

        return (
            <InfoListItem>
                {labelValue && <InfoListItemLabel>{labelValue}</InfoListItemLabel>}
                {children}
            </InfoListItem>
        );
    }
}
