import { TopologyProvider } from "link-redux";
import { Chip as ChipComp } from "material-ui";
import { ChipProps } from "material-ui/Chip/Chip";
import * as React from "react";

import { NS } from "../LRS";

export const ChipTopology = NS.app("chip");

export class Chip extends TopologyProvider<ChipProps> {
    constructor(props) {
        super(props);

        this.topology = ChipTopology;
    }

    public render() {
        return (
            <ChipComp {...this.props}>
                {this.props.children}
            </ChipComp>
        );
    }
}
