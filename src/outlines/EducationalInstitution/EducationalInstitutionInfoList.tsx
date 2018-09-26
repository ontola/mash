import { Property } from "link-redux";
import * as React from "react";

import { InfoListTopology } from "../../canvasses";
import { InfoListSection } from "../../canvasses/InfoList/InfoListSection";
import { EducationalInstitutionTypes } from "../../helpers/types";
import { NS } from "../../LRS";

export class EducationalInstitutionInfoList extends React.PureComponent {
    public static type = EducationalInstitutionTypes;

    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={NS.dbo("motto")} />
                <Property label={NS.dbo("endowment")} />
                <Property label={NS.dbo("president")} />
                <Property label={NS.dbo("facultySize")} />
                <Property label={NS.dbo("numberOfStudents")} />
                <Property label={NS.dbo("numberOfUndergraduateStudents")} />
                <Property label={NS.dbo("numberOfPostgraduateStudents")} />
                <Property label={NS.dbo("city")} />
                <Property label={NS.dbo("campus")} />
                <Property label={NS.dbo("officialSchoolColour")} />
                <Property label={NS.dbo("athletics")} />
                <Property label={NS.foaf("nick")} />
                <Property label={NS.dbo("affiliation")} />
            </InfoListSection>
        );
    }
}
