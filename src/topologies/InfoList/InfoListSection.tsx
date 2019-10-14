import { TopologyProvider } from "link-redux";
import * as React from "react";

import app from "../../ontology/app";

export const InfoListSectionTopology = app.ns("infoListSection");

export class InfoListSection extends TopologyProvider<any> {
    constructor(props) {
        super(props);

        this.topology = InfoListSectionTopology;
    }

    public render() {
        return this.wrap((
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        ));
    }
}
