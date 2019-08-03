import { TableCell } from "@material-ui/core";
import { TopologyProvider } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const ArticleTableCellTopology = NS.app("articleTableCell");

export class ArticleTableCell extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = ArticleTableCellTopology;
    }

    public render() {
        return this.wrap((
            <TableCell>
                {this.props.children}
            </TableCell>
        ));
    }
}
