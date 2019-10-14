import foaf from "@ontologies/foaf";
import { Property } from "link-redux";
import * as React from "react";

import { PlaceTypes } from "../../helpers/types";
import app from "../../ontology/app";
import dbo from "../../ontology/dbo";
import dbp from "../../ontology/dbp";
import { InfoListTopology } from "../../topologies";
import { InfoListSection } from "../../topologies/InfoList/InfoListSection";

export class PlaceInfoList extends React.PureComponent {
    public static type = PlaceTypes;

    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={foaf.nick}/>
                <Property label={dbo.ns("motto")}/>

                <Property forceRender label={app.ns("coordinates")}/>

                <Property label={dbo.ns("governingBody")} />
                <Property label={dbo.ns("leaderName")} />
                <Property label={dbo.ns("leaderParty")} />

                <Property label={dbo.ns("populationTotal")} />
                <Property label={dbo.ns("populationUrban")} />
                <Property label={dbp.ns("populationDemonym")} />

                <Property label={dbo.ns("areaTotal")} />
                <Property label={dbo.ns("areaLand")} />
                <Property label={dbo.ns("areaWater")} />

                <Property label={dbo.ns("postalCode")} />
                <Property label={dbo.ns("areaCode")} />
            </InfoListSection>
        );
    }
}
