import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import { NS } from "../../LRS";
import { IconTopology } from "../../topologies";

const useStyles = makeStyles({
  root: {
    color: "inherit",
    marginLeft: "-8px",
    marginTop: "-8px",
  },
  svg: {
    transform: "scale(0.5)",
  },
});

export const LoadingResourceIcon = () => {
  const classes = useStyles({});

  return (
    <CircularProgress classes={classes} />
  );
};

LoadingResourceIcon.type = NS.ll("LoadingResource");

LoadingResourceIcon.topology = [
  IconTopology,
];

const useStyles2 = makeStyles({
  root: {
    color: "inherit",
    height: "3em !important",
    width: "3em !important",
  },
  svg: {
    transform: "scale(0.5)",
  },
});

export const LoadingResourceSession = () => {
  const classes = useStyles2({});

  return (
    <CircularProgress classes={classes} />
  );
};

LoadingResourceSession.type = NS.ll("LoadingResource");

LoadingResourceSession.topology = [
  NS.solid("session/topology"),
];
