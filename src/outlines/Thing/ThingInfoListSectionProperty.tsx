import { NamedNode } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { normalizeType } from "link-lib";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { ImageProps } from "../../helpers/types";
import app from "../../ontology/app";
import { InfoListSectionTopology } from "../../topologies";
import { InfoListItem } from "../../topologies/InfoList/InfoListItem";

import { ArticleBase } from "./ArticleBase";

interface LabelProp {
  label: NamedNode | NamedNode[];
}

const BLACKLIST = [...ImageProps, app.ns("coordinates")];

export class ThingInfoListSectionProperty extends ArticleBase<LabelProp> {
  public static property = rdf.predicate;

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
