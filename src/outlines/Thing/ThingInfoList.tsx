import { Property } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { InfoListTopology } from "../../canvasses";
import { InfoListSection } from "../../canvasses/InfoList/InfoListSection";
import { ImageProps } from "../../helpers/types";
import { NS } from "../../LRS";

import { ArticleBase } from "./ArticleBase";

interface LabelProp {
    label: NamedNode;
}

export class ThingInfoList extends ArticleBase<LabelProp> {
    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={ImageProps} />
                <Property label={NS.foaf("homepage")} />
            </InfoListSection>
        );
    }
}
