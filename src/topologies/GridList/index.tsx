import { GridList as GridListComp } from "@material-ui/core";
import { GridListProps } from "@material-ui/core/GridList";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import app from "../../ontology/app";

export const GridListTopology = app.ns("gridList");

export class GridList extends TopologyProvider<GridListProps & TopologyProviderProps> {
  constructor(props) {
    super(props);

    this.topology = GridListTopology;
  }

  public render() {
    return this.wrap((
      <GridListComp style={{ cursor: "pointer", justifyContent: 'space-around' }} {...this.props}>
        {this.props.children}
      </GridListComp>
    ));
  }
}
