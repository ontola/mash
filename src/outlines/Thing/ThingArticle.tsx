import { Property } from "link-redux";
import * as React from "react";

import { ArticleTopology } from "../../canvasses";
import { ArticleLayout } from "../../components/ArticleLayout";
import { TextProps } from "../../helpers/types";
import { NS } from "../../LRS";

import { ArticleBase } from "./ArticleBase";

export class ThingArticle extends ArticleBase {
    public static topology = ArticleTopology;

    public render() {
        return (
            <ArticleLayout>
                <Property label={TextProps} />
                <Property label={NS.schema("creator")}/>
            </ArticleLayout>
        );
    }
}
