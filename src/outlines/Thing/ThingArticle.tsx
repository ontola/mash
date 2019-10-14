import schema from "@ontologies/schema";
import { Property } from "link-redux";
import * as React from "react";

import { ArticleLayout } from "../../components/ArticleLayout";
import { TextProps } from "../../helpers/types";
import dbo from "../../ontology/dbo";
import { ArticleTopology } from "../../topologies";

import { ArticleBase } from "./ArticleBase";

export class ThingArticle extends ArticleBase {
  public static topology = ArticleTopology;

  public render() {
    return (
      <ArticleLayout>
        <Property label={TextProps} />
        <Property label={schema.creator} />
        <Property label={dbo.ns("careerStation")} />
      </ArticleLayout>
    );
  }
}
