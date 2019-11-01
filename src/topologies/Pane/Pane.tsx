import { StyledComponentProps, withStyles } from "@material-ui/core";
import { TopologyProvider, TopologyProviderProps } from "link-redux";
import * as React from "react";

import browser from "../../ontology/browser";

export const PaneTopology = browser.ns("pane");

const paneSyles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(1),
  },
});

class PaneProvider extends TopologyProvider<TopologyProviderProps & StyledComponentProps> {
  public static displayName = "Pane";

  constructor(props) {
    super(props);

    this.topology = PaneTopology;
  }

  public render() {
    const { classes } = this.props;

    return this.wrap((
      <div className={classes.root}>
        {this.props.children}
      </div>
    ));
  }
}

export const Pane = withStyles(paneSyles)(PaneProvider);
