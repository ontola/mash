import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import {
  allTopologiesExcept,
  ArticleTableCellTopology,
  ArticleTopology, IconTopology,
  InfoListItemTopology,
  InfoListTopology,
} from "../../topologies";

import { NS } from "../../LRS";

const useStyles = makeStyles({
  progress: {
    color: "inherit",
  },
});

export const LoadingResource = () => {
  const classes = useStyles({});

  return (
    <CircularProgress className={classes.progress} />
  );
};

LoadingResource.type = NS.ll("LoadingResource");

LoadingResource.topology = allTopologiesExcept(
  ArticleTableCellTopology,
  ArticleTopology,
  IconTopology,
  InfoListItemTopology,
  InfoListTopology,
);
