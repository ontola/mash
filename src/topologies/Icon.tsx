import { Icon as IconComp } from "@material-ui/core";
import { IconProps } from "@material-ui/core/Icon";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import { NS } from "../LRS";

export const IconTopology = NS.app("icon");

export class Icon extends TopologyProvider<IconProps & TopologyProviderProps> {
  constructor(props) {
    super(props);

    this.topology = IconTopology;
  }

  public render() {
    return this.wrap((
      <IconComp {...this.props}>
        {this.props.children}
      </IconComp>
    ));
  }
}
