import { TopologyProvider } from "link-redux";

import { NS } from "../../LRS";

export const InfoListCellTopology = NS.app("infoListCell");

export class InfoListCell extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = InfoListCellTopology;
    }
}
