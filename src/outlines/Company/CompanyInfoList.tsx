import { Property } from "link-redux";
import * as React from "react";

import { InfoListTopology } from "../../canvasses";
import { InfoListSection } from "../../canvasses/InfoList/InfoListSection";
import { CompanyTypes } from "../../helpers/types";
import { NS } from "../../LRS";

export class CompanyInfoList extends React.PureComponent {
    public static type = CompanyTypes;
    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={NS.dbo("type")} />
                <Property label={NS.dbo("industry")} />
                <Property label={NS.dbo("foundingYear")} />
                <Property label={NS.dbo("keyPeople")} />
                <Property label={NS.dbo("product")} />
                <Property label={NS.dbo("revenue")} />
                <Property label={NS.dbo("operatingIncome")} />
                <Property label={NS.dbo("netIncome")} />
                <Property label={NS.dbo("assets")} />
                <Property label={NS.dbo("equity")} />
                <Property label={NS.dbo("numberOfEmployees")} />
            </InfoListSection>
        );
    }
}
