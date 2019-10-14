import { LinkedResourceContainer, useLRS } from "link-redux";
import * as React from "react";

import ontola from "../../../ontology/ontola";
import { allTopologies } from "../../../topologies";

export const SnackbarManager = ({ queue }) => {
  const lrs = useLRS();

  if (!queue || queue.elements.length === 0) {
    return null;
  }

  return (
    <LinkedResourceContainer
      close={() => lrs.exec(ontola.ns("actions/snackbar/finished"))}
      key={queue.elements[0].value}
      subject={queue.elements[0]}
    />
  );
};

SnackbarManager.type = ontola.ns("snackbar/Manager");

SnackbarManager.topology = allTopologies;

SnackbarManager.mapDataToProps = {
  queue: ontola.ns("snackbar/queue"),
};
