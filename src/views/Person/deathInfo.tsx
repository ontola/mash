import { Term } from "@ontologies/core";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import InfoListItemText from "../../components/InfoListItemText";
import { PersonTypes } from "../../helpers/types";
import app from "../../ontology/app";
import dbo from "../../ontology/dbo";
import { InfoListTopology } from "../../topologies";

interface PropTypes {
    birthDate?: Term;
    deathDate?: Term;
    deathPlace?: Term;
}

function calcAge(birth: number, death: number) {
    return ~~((death - birth) / (31557600000));
}

export class PersonDeathInfoList extends React.PureComponent<PropTypes> {
    public static type = PersonTypes;

    public static property = app.ns("deathInfo");

    public static topology = InfoListTopology;

    public static mapDataToProps = {
        birthDate: dbo.ns("birthDate"),
        deathDate: dbo.ns("deathDate"),
        deathPlace: dbo.ns("deathPlace"),
    };

    public ageLabel() {
        const {
            birthDate,
            deathDate,
        } = this.props;
        if (!birthDate || !deathDate) {
            return null;
        }

        const birth = Date.parse(birthDate.value);
        const death = Date.parse(deathDate.value);

        if (!birth || !death) {
            return null;
        }

        return (
            <React.Fragment>
                {` (aged ${calcAge(birth, death)})`}
            </React.Fragment>
        );
    }

    public render() {
        const {
            deathDate,
            deathPlace,
        } = this.props;

        if (!(deathDate || deathPlace)) {
            return null;
        }

        let BirthPlaceLabel;
        if (deathPlace && deathPlace.termType === "NamedNode") {
            BirthPlaceLabel = () => (
                <React.Fragment>
                    {" in "}<LinkedResourceContainer subject={deathPlace} />
                </React.Fragment>
            );
        } else if (deathPlace && deathPlace.termType === "Literal") {
            BirthPlaceLabel = () => ` in ${deathPlace.value}`;
        }

        const label = `${deathDate ? ` on ${deathDate.value}` : ""}`;

        return (
            <React.Fragment>
                <InfoListItemLabel>Died</InfoListItemLabel>
                <InfoListItemText>
                    {label}{this.ageLabel()}{BirthPlaceLabel && <BirthPlaceLabel />}
                </InfoListItemText>
            </React.Fragment>
        );
    }
}
