import { TopologyProvider } from "link-redux";
import { Table } from "material-ui";
import * as React from "react";

import { NS } from "../LRS";

export const InfoListTopology = NS.app("infoList");

export class InfoList extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = InfoListTopology;
    }

    public render() {
        return (
            <Table>
                {this.props.children}
            </Table>
        );
    }
}
