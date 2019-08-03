import { TopologyProvider } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const InfoListCaptionTopology = NS.app("infoListCaption");

export class InfoListCaption extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = InfoListCaptionTopology;
    }

    public render() {
        return this.wrap((
            <caption>
                {this.props.children}
            </caption>
        ));
    }
}
