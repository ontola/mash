import { LinkedResourceContainer, Type } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { ArticleTableRowTopology } from "../../canvasses";
import { ArticleTableCell } from "../../canvasses/Article/ArticleTableCell";

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
                    {label
                        ? <LinkedResourceContainer subject={label}
                                                   onError={() => <p>{label.value}</p>}/>
                        : null}
                </ArticleTableCell>
                <ArticleTableCell>
                    <Type {...this.props as LabelProp} />
                </ArticleTableCell>
            </React.Fragment>
        );
    }
}
