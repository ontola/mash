import { TableRow } from "@material-ui/core";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const InfoListItemTopology = NS.app("infoListItem");

export interface PropTypes extends TopologyProviderProps {
    style?: object;
}

// TODO: obsolete?
export class InfoListItem extends TopologyProvider<PropTypes> {
    constructor(props) {
        super(props);

        this.topology = InfoListItemTopology;
    }

    public render() {
        return this.wrap((
            <TableRow style={this.props.style}>
                {this.props.children}
            </TableRow>
        ));
    }
}
