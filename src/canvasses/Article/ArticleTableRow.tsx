import { TopologyProvider } from "link-redux";
import { TableRow } from "material-ui";
import * as React from "react";

import { NS } from "../../LRS";

export const ArticleTableRowTopology = NS.app("articleTableRow");

export class ArticleTableRow extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = ArticleTableRowTopology;
    }

    public render() {
        return (
            <TableRow>
                {this.props.children}
            </TableRow>
        );
    }
}
