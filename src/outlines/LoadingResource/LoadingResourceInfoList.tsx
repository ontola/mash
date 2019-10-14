import { CircularProgress } from "@material-ui/core";
import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import ll from "../../ontology/ll";
import { InfoListTopology } from "../../topologies";

export const LoadingResourceInfoList = ({ label }) => (
  <React.Fragment>
    {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
    <CircularProgress />
  </React.Fragment>
);

LoadingResourceInfoList.type = ll.LoadingResource;

LoadingResourceInfoList.topology = InfoListTopology;
