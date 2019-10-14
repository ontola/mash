import { CircularProgress } from "@material-ui/core";
import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import ll from "../../ontology/ll";
import { ArticleTableCellTopology, InfoListItemTopology } from "../../topologies";

export const LoadingResourceInfoListItem = () => (
  <InfoListItemLabel>
      <CircularProgress />
  </InfoListItemLabel>
);

LoadingResourceInfoListItem.type = ll.LoadingResource;

LoadingResourceInfoListItem.topology = [
    ArticleTableCellTopology,
    InfoListItemTopology,
];
