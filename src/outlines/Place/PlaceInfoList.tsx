import { Property } from "link-redux";
import * as React from "react";

import { InfoListTopology } from "../../topologies";
import { InfoListSection } from "../../topologies/InfoList/InfoListSection";
import { PlaceTypes } from "../../helpers/types";
import { NS } from "../../LRS";

export class PlaceInfoList extends React.PureComponent {
    public static type = PlaceTypes;

    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={NS.foaf("nick")}/>
                <Property label={NS.dbo("motto")}/>

                <Property forceRender label={NS.app("coordinates")}/>

                <Property label={NS.dbo("governingBody")} />
                <Property label={NS.dbo("leaderName")} />
                <Property label={NS.dbo("leaderParty")} />

                <Property label={NS.dbo("populationTotal")} />
                <Property label={NS.dbo("populationUrban")} />
                <Property label={NS.dbp("populationDemonym")} />

                <Property label={NS.dbo("areaTotal")} />
                <Property label={NS.dbo("areaLand")} />
                <Property label={NS.dbo("areaWater")} />

                <Property label={NS.dbo("postalCode")} />
                <Property label={NS.dbo("areaCode")} />
            </InfoListSection>
        );
    }
}
