import { CircularProgress } from "@material-ui/core";
import * as React from "react";

import { InfoListTopology } from "../../topologies";
import InfoListItemLabel from "../../components/InfoListItemLabel";
import { NS } from "../../LRS";

export const LoadingResourceInfoList = ({ label }) => (
  <React.Fragment>
    {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
    <CircularProgress />
  </React.Fragment>
);

LoadingResourceInfoList.type = NS.ll("LoadingResource");

LoadingResourceInfoList.topology = InfoListTopology;
