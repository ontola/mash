import { TopologyProvider } from "link-redux";
import * as React from "react";

import app from "../../ontology/app";

export const DataGridCellListItemTopology = app.ns("dataGridCellListItem");

export class DataGridCellListItem extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = DataGridCellListItemTopology;
    }

    public render() {
        return this.wrap((
            <li>
                {this.props.children}
            </li>
        ));
    }
}
