import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { NS } from "../../../LRS";
import { allTopologies } from "../../../topologies";

export const SnackbarManager = (props) => {
  const queue = props["snackbar/queue"];

  if (!queue || queue.elements.length === 0) {
    return null;
  }

  return (
    <LinkedResourceContainer
      close={() => props.lrs.exec(NS.ontola("actions/snackbar/finished"))}
      key={queue.elements[0].value}
      subject={queue.elements[0]}
    />
  );
};

SnackbarManager.type = NS.ontola("snackbar/Manager");

SnackbarManager.topology = allTopologies;

SnackbarManager.mapDataToProps = [NS.ontola("snackbar/queue")];
