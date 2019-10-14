import { TopologyProvider } from "link-redux";

import app from "../../ontology/app";

export const InfoListCellTopology = app.ns("infoListCell");

export class InfoListCell extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = InfoListCellTopology;
    }
}
