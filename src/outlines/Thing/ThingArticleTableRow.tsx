import { NamedNode } from "@ontologies/core";
import { LinkedResourceContainer, Type } from "link-redux";
import * as React from "react";

import { ArticleTableRowTopology } from "../../topologies";
import { ArticleTableCell } from "../../topologies/Article/ArticleTableCell";

import { ArticleBase } from "./ArticleBase";

interface LabelProp {
  label: NamedNode;
}

export class ThingArticleTableRow extends ArticleBase<LabelProp> {
  public static topology = ArticleTableRowTopology;

  public render() {
    const { label } = this.props;

    return (
      <React.Fragment>
        <ArticleTableCell>
          {!label
            ? null
            : (
              <LinkedResourceContainer
              subject={label}
              onError={() => <p>{label.value}</p>}
            />
            )
          }
        </ArticleTableCell>
        <ArticleTableCell>
          <Type {...this.props as LabelProp} />
        </ArticleTableCell>
      </React.Fragment>
    );
  }
}
