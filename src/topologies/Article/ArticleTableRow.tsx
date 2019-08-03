import { TableRow } from "@material-ui/core";
import { TopologyProvider } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const ArticleTableRowTopology = NS.app("articleTableRow");

export class ArticleTableRow extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = ArticleTableRowTopology;
    }

    public render() {
        return this.wrap((
            <TableRow>
                {this.props.children}
            </TableRow>
        ));
    }
}
