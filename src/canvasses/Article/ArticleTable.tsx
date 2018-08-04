import { Table } from "@material-ui/core";
import { TopologyProvider } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const ArticleTableTopology = NS.app("articleTable");

export class ArticleTable extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = ArticleTableTopology;
    }

    public render() {
        return this.wrap((
            <Table>
                {this.props.children}
            </Table>
        ));
    }
}
