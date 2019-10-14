import rdfFactory, { NamedNode } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import * as React from "react";

import { ArticleTableRowTopology } from "../../topologies";
import { ArticleTableRow } from "../../topologies/Article/ArticleTableRow";

import { ArticleBase } from "./ArticleBase";

interface LabelProp {
  label: NamedNode;
}

export class ThingTableRowProperty extends ArticleBase<LabelProp> {
  public static property = rdf.predicate;

  public static topology = ArticleTableRowTopology;

  public render() {
    const { children, label } = this.props;

    return (
      <ArticleTableRow>
        {label && Array.isArray(label) ? rdfFactory.toNQ(label[0]) : rdfFactory.toNQ(label)}
        {children}
      </ArticleTableRow>
    );
  }
}
