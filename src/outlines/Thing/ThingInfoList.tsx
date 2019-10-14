import { NamedNode } from "@ontologies/core";
import foaf from "@ontologies/foaf";
import { Property } from "link-redux";
import * as React from "react";

import { ImageProps } from "../../helpers/types";
import { InfoListTopology } from "../../topologies";
import { InfoListSection } from "../../topologies/InfoList/InfoListSection";

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
        <Property label={foaf.homepage} />
      </InfoListSection>
    );
  }
}
