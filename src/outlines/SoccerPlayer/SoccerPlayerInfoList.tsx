import { Property } from "link-redux";
import * as React from "react";

import dbo from "../../ontology/dbo";
import dbp from "../../ontology/dbp";
import { InfoListTopology } from "../../topologies";
import { InfoListSection } from "../../topologies/InfoList/InfoListSection";

export class SoccerPlayerInfoList extends React.PureComponent {
    public static type = dbo.ns("SoccerPlayer");

    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={dbo.ns("position")} />
                <Property label={dbp.ns("totalgoals")} />
            </InfoListSection>
        );
    }
}
