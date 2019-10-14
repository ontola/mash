import { Chip as ChipComp } from "@material-ui/core";
import { ChipProps } from "@material-ui/core/Chip";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import app from "../ontology/app";

export const ChipTopology = app.ns("chip");

export class Chip extends TopologyProvider<ChipProps & TopologyProviderProps> {
  constructor(props) {
    super(props);

    this.topology = ChipTopology;
  }

  public render() {
    return this.wrap((
      <ChipComp style={{ cursor: "pointer" }} {...this.props}>
        {this.props.children}
      </ChipComp>
    ));
  }
}
