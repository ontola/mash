import { TopologyProvider } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const InfoListSectionTopology = NS.app("infoListSection");

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
