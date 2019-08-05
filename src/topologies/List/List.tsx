import { List as ListComp } from "@material-ui/core";
import { ListProps } from "@material-ui/core/List";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const ListTopology = NS.app("list");

export class List extends TopologyProvider<ListProps & TopologyProviderProps> {
  constructor(props) {
    super(props);

    this.topology = ListTopology;
  }

  public render() {
    return this.wrap((
      <ListComp {...this.props}>
        {this.props.children}
      </ListComp>
  ));
  }
}
