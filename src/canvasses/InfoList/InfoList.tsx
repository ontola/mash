import { TopologyProvider } from "link-redux";
import { Table, withStyles } from "material-ui";
import { StyleRules } from "material-ui/styles";
import * as React from "react";

import { NS } from "../../LRS";

export const InfoListTopology = NS.app("infoList");

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
        return (
            <Table classes={{ root: this.props.classes.fitTable }}>
                {this.props.children}
            </Table>
        );
    }
}

export const InfoList = withStyles(styles)(InfoListComp);
