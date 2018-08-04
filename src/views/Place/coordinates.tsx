import { Literal } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../canvasses";
import InfoListItemText from "../../components/InfoListItemText";
import { PlaceTypes } from "../../helpers/types";
import { NS } from "../../LRS";

interface PropTypes {
    latd: Literal;
    latm: Literal;
    latns: Literal;
    longd: Literal;
    longew: Literal;
    longm: Literal;
}

export class CoordinatesInfoList extends React.PureComponent<PropTypes> {
    public static type = PlaceTypes;
    public static property = NS.app("coordinates");
    public static topology = InfoListSectionTopology;
    public static mapDataToProps = [
        NS.dbp("latd"),
        NS.dbp("latm"),
        NS.dbp("latns"),
        NS.dbp("longd"),
        NS.dbp("longew"),
        NS.dbp("longm"),
    ];
    public static linkOpts = {
        returnType: "value",
    };

    public render() {
        const { latd, latm, latns, longd, longew, longm } = this.props;

        return (
            <InfoListItemText>
                {`${latd}°${latm}′${latns} ${longd}°${longm}′${longew}`}
            </InfoListItemText>
        );
    }
}
