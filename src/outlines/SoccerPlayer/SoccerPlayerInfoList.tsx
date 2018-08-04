import { Property } from "link-redux";
import * as React from "react";

import { InfoListTopology } from "../../canvasses";
import { InfoListSection } from "../../canvasses/InfoList/InfoListSection";
import { NS } from "../../LRS";

export class SoccerPlayerInfoList extends React.PureComponent {
    public static type = [NS.dbo("SoccerPlayer")];
    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={NS.dbo("position")} />
                <Property label={NS.dbp("totalgoals")} />
            </InfoListSection>
        );
    }
}
