import { TopologyProvider } from "link-redux";
import { Grid } from "material-ui";
import * as React from "react";

import { NS } from "../../LRS";

export const DataGridTopology = NS.app("dataGrid");

export class DataGrid extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = DataGridTopology;
    }

    public render() {
        return (
            <Grid container justify="center" wrap="wrap-reverse">
                {this.props.children}
            </Grid>
        );
    }
}
