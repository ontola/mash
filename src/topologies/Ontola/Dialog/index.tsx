import MaterialDialog, { DialogProps } from "@material-ui/core/Dialog";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import ontola from "../../../ontology/ontola";

export const DialogTopology = ontola.ns("dialog");

/**
 * Sets a dialog topology.
 * [Dialog](https://material.io/design/components/dialogs.html) refers to alert, simple
 * and confirmation dialogs
 */
export class Dialog extends TopologyProvider<DialogProps & TopologyProviderProps> {
  constructor(props) {
    super(props);

    this.topology = DialogTopology;
  }

  public render() {
    const { children, ...rest } = this.props;

    return this.wrap((
      <MaterialDialog {...rest}>
        {children}
      </MaterialDialog>
    ));
  }
}
