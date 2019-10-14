import { LinkedResourceContainer, useLRS } from "link-redux";
import * as React from "react";
import { seqToArr } from "../../../helpers/seq";

import ontola from "../../../ontology/ontola";
import { allTopologies } from "../../../topologies";

export const SnackbarManager = ({ queue }) => {
  const lrs = useLRS();
  const elements = seqToArr(lrs, queue);

  if (elements.length === 0) {
    return null;
  }

  return (
    <LinkedResourceContainer
      close={() => lrs.exec(ontola.ns("actions/snackbar/finished"))}
      key={elements[0].value}
      subject={elements[0]}
    />
  );
};

SnackbarManager.type = ontola.ns("snackbar/Manager");

SnackbarManager.topology = allTopologies;

SnackbarManager.mapDataToProps = {
  dataSubjects: ontola.ns("snackbar/queue"),
  queue: ontola.ns("snackbar/queue"),
};
