import { normalizeType } from "link-lib";
import { LinkedResourceContainer } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";
import { InfoListSectionTopology } from "../../topologies";

import { InfoListItem } from "../../topologies/InfoList/InfoListItem";
import { ImageProps } from "../../helpers/types";
import { NS } from "../../LRS";

import { ArticleBase } from "./ArticleBase";

interface LabelProp {
  label: NamedNode | NamedNode[];
}

const BLACKLIST = [...ImageProps, NS.app("coordinates")];

export class ThingInfoListSectionProperty extends ArticleBase<LabelProp> {
  public static property = NS.rdf("predicate");

  public static topology = InfoListSectionTopology;

  public render() {
    const { children, label } = this.props;

    const labelArr = normalizeType(label);
    if (BLACKLIST.find((value) => -1 !== labelArr.indexOf(value))) {
      return children;
    }

    return (
      <InfoListItem>
        <LinkedResourceContainer subject={labelArr[0]} />
        {children}
      </InfoListItem>
    );
  }
}
