import { LinkedResourceContainer } from "link-redux";
import { SomeTerm } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses/InfoList/InfoListSection";
import InfoListItemText from "../../components/InfoListItemText";
import { BirthPlaceProps, NameProps, PersonTypes } from "../../helpers/types";
import { NS } from "../../LRS";

interface PropTypes {
    birthDate: SomeTerm;
    birthName: SomeTerm;
    birthPlace: SomeTerm;
    fallbackName: SomeTerm;
}

export class PersonBornInfoList extends React.PureComponent<PropTypes> {
    public static type = PersonTypes;
    public static property = NS.app("bornInfo");
    public static topology = InfoListSectionTopology;
    public static mapDataToProps = {
        birthDate: NS.dbo("birthDate"),
        birthName: NS.dbo("birthName"),
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
