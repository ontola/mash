import MaterialCard from "@material-ui/core/Card";
import { TopologyProvider } from "link-redux";
import * as React from "react";

import app from "../../ontology/app";

export const CardTopology = app.ns("card");

export class Card extends TopologyProvider<any> {
  constructor(props) {
    super(props);

    this.topology = CardTopology;
  }

  public render() {
    return this.wrap((
      <MaterialCard>
        {this.props.children}
      </MaterialCard>
    ));
  }
}
