import foaf from "@ontologies/foaf";
import { Property } from "link-redux";
import * as React from "react";

import { EducationalInstitutionTypes } from "../../helpers/types";
import dbo from "../../ontology/dbo";
import { InfoListTopology } from "../../topologies";
import { InfoListSection } from "../../topologies/InfoList/InfoListSection";

export class EducationalInstitutionInfoList extends React.PureComponent {
    public static type = EducationalInstitutionTypes;

    public static topology = InfoListTopology;

    public render() {
        return (
            <InfoListSection>
                <Property label={dbo.ns("motto")} />
                <Property label={dbo.ns("endowment")} />
                <Property label={dbo.ns("president")} />
                <Property label={dbo.ns("facultySize")} />
                <Property label={dbo.ns("numberOfStudents")} />
                <Property label={dbo.ns("numberOfUndergraduateStudents")} />
                <Property label={dbo.ns("numberOfPostgraduateStudents")} />
                <Property label={dbo.ns("city")} />
                <Property label={dbo.ns("campus")} />
                <Property label={dbo.ns("officialSchoolColour")} />
                <Property label={dbo.ns("athletics")} />
                <Property label={foaf.nick} />
                <Property label={dbo.ns("affiliation")} />
            </InfoListSection>
        );
    }
}
