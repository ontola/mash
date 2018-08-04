import { TableRow } from "@material-ui/core";
import { Property } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { ArticleTableTopology } from "../../canvasses";
import { ArticleTableCell } from "../../canvasses/Article/ArticleTableCell";

import { ArticleBase } from "./ArticleBase";

interface ThingArticleTableProps {
    cells: NamedNode[];
}

export class ThingArticleTable extends ArticleBase<ThingArticleTableProps> {
    public static topology = ArticleTableTopology;

    public render() {
        const { cells } = this.props;

        return (
            <TableRow>
                {cells.map((c) => (
                    <ArticleTableCell>
                        <Property label={c}/>
                    </ArticleTableCell>
                ))}
            </TableRow>
        );
    }
}
