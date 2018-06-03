import LinkedRenderStore from "link-lib";
import { link } from "link-redux";
import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import InfoListItemText from "../../components/InfoListItemText";
import { PlaceTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { InfoListTopology } from "../../canvasses";

const CoordinatesInfoList = ({ latd, latm, latns, longd, longew, longm}) => (
  <React.Fragment>
    <InfoListItemLabel>Coordinates:</InfoListItemLabel>
    <InfoListItemText>{`${latd}°${latm}′${latns} ${longd}°${longm}′${longew}`}</InfoListItemText>
  </React.Fragment>
);

export default LinkedRenderStore.registerRenderer(
    link([
        NS.dbp("latd"),
        NS.dbp("latm"),
        NS.dbp("latns"),
        NS.dbp("longd"),
        NS.dbp("longew"),
        NS.dbp("longm"),
    ], {
        returnType: "value",
    })(CoordinatesInfoList),
    PlaceTypes,
    NS.app("coordinates"),
    InfoListTopology,
);
