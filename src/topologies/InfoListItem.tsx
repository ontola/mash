import { TopologyProvider } from "link-redux";
import { TableRow } from "material-ui";
import * as React from "react";

import { NS } from "../LRS";

export const InfoListItemTopology = NS.app("infoListItem");

export interface PropTypes {
    style?: object;
}

export class InfoListItem extends TopologyProvider<PropTypes> {
    constructor(props) {
        super(props);

        this.topology = InfoListItemTopology;
    }

    public render() {
        return (
            <TableRow style={this.props.style}>
                {this.props.children}
            </TableRow>
        );
    }
}
