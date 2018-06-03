import { TopologyProvider, Type } from "link-redux";
import { TableBody, TableRow } from "material-ui";
import * as React from "react";

import { NS } from "../../LRS";
import { InfoListCaption } from "./InfoListCaption";

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
                <InfoListCaption />
                <TableBody>
                    <Type />
                </TableBody>
            </TableRow>
        );
    }
}
