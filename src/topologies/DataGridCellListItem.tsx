import { TopologyProvider } from "link-redux";
import * as React from "react";

import { NS } from "../LRS";

export const DataGridCellListItemTopology = NS.app("dataGridCellListItem");

export class DataGridCellListItem extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = DataGridCellListItemTopology;
    }

    public render() {
        return (
            <li>
                {this.props.children}
            </li>
        );
    }
}
