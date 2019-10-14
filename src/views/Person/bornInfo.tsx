import { Term } from "@ontologies/core";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import InfoListItemText from "../../components/InfoListItemText";
import { BirthPlaceProps, NameProps, PersonTypes } from "../../helpers/types";
import app from "../../ontology/app";
import dbo from "../../ontology/dbo";
import { InfoListSectionTopology } from "../../topologies/InfoList/InfoListSection";

interface PropTypes {
    birthDate: Term;
    birthName: Term;
    birthPlace: Term;
    fallbackName: Term;
}

export class PersonBornInfoList extends React.PureComponent<PropTypes> {
    public static type = PersonTypes;
    public static property = app.ns("bornInfo");
    public static topology = InfoListSectionTopology;
    public static mapDataToProps = {
        birthDate: dbo.ns("birthDate"),
        birthName: dbo.ns("birthName"),
        birthPlace: {
            label: BirthPlaceProps,
            name: "birthPlace",
        },
        fallbackName: {
            label: NameProps,
        },
    };

    public render() {
        const { birthDate, birthName, birthPlace, fallbackName } = this.props;

        if (!(birthDate || birthName || birthPlace)) {
            return null;
        }

        let BirthPlaceLabel;
        if (birthPlace && birthPlace.termType === "NamedNode") {
            BirthPlaceLabel = () => (
                <React.Fragment>
                    {" in "}<LinkedResourceContainer subject={birthPlace} />
                </React.Fragment>
            );
        } else if (birthPlace && birthPlace.termType === "Literal") {
            BirthPlaceLabel = () => ` in ${birthPlace.value}`;
        }

        let name = birthName ? birthName.value : "";
        if (!birthName) {
            name = fallbackName ? fallbackName.value : "";
        }

        const label = `${name}${birthDate ? ` on ${birthDate.value}` : ""}`;

        return (
            <InfoListItemText>{label}{BirthPlaceLabel && <BirthPlaceLabel />}</InfoListItemText>
        );
    }
}
