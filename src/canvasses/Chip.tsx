import { Chip as ChipComp } from "@material-ui/core";
import { ChipProps } from "@material-ui/core/Chip";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import { NS } from "../LRS";

export const ChipTopology = NS.app("chip");

export class Chip extends TopologyProvider<ChipProps & TopologyProviderProps> {
    constructor(props) {
        super(props);

        this.topology = ChipTopology;
    }

    public render() {
        return this.wrap((
            <ChipComp {...this.props}>
                {this.props.children}
            </ChipComp>
        ));
    }
}
