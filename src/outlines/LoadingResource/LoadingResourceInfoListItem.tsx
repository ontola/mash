import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { ArticleTableCellTopology, InfoListItemTopology } from "../../topologies";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import { NS } from "../../LRS";

export const LoadingResourceInfoListItem = () => (
  <InfoListItemLabel>
      <CircularProgress />
  </InfoListItemLabel>
);

LoadingResourceInfoListItem.type = NS.ll("LoadingResource");

LoadingResourceInfoListItem.topology = [
    ArticleTableCellTopology,
    InfoListItemTopology,
];
