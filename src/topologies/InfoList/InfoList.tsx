import { Table, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { TopologyProvider } from "link-redux";
import * as React from "react";

import app from "../../ontology/app";

export const InfoListTopology = app.ns("infoList");

const styles = {
    fitTable: {
        tableLayout: "fixed",
    },
} as StyleRules;

class InfoListComp extends TopologyProvider<any> {
    constructor(props) {
        super(props);

        this.topology = InfoListTopology;
    }

    public render() {
        return this.wrap((
            <Table classes={{ root: this.props.classes.fitTable }}>
                {this.props.children}
            </Table>
        ));
    }
}

export const InfoList = withStyles(styles)(InfoListComp);
