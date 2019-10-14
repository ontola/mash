import { Property } from "link-redux";
import * as React from "react";

import { CompanyTypes } from "../../helpers/types";
import dbo from "../../ontology/dbo";
import { InfoListTopology } from "../../topologies";
import { InfoListSection } from "../../topologies/InfoList/InfoListSection";

export class CompanyInfoList extends React.PureComponent {
    public static type = CompanyTypes;

    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={dbo.ns("type")} />
                <Property label={dbo.ns("industry")} />
                <Property label={dbo.ns("foundingYear")} />
                <Property label={dbo.ns("keyPeople")} />
                <Property label={dbo.ns("product")} />
                <Property label={dbo.ns("revenue")} />
                <Property label={dbo.ns("operatingIncome")} />
                <Property label={dbo.ns("netIncome")} />
                <Property label={dbo.ns("assets")} />
                <Property label={dbo.ns("equity")} />
                <Property label={dbo.ns("numberOfEmployees")} />
            </InfoListSection>
        );
    }
}
