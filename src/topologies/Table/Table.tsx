import { Table as TableComp } from "@material-ui/core";
import { TableProps } from "@material-ui/core/Table";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const TableTopology = NS.app("chip");

export class Table extends TopologyProvider<TableProps & TopologyProviderProps> {
  constructor(props) {
    super(props);

    this.topology = TableTopology;
  }

  public render() {
    return this.wrap((
      <TableComp {...this.props}>
        {this.props.children}
      </TableComp>
    ));
  }
}
