import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import ontola from "../../../ontology/ontola";
import { allTopologies } from "../../../topologies";
import { Dialog } from "../../../topologies/Ontola/Dialog";

export const DialogManager = ({ lrs, resource }) => {
  const close = () => lrs.exec(ontola.ns("actions/dialog/close"));

  return (
    <Dialog open={!!resource} onClose={close}>
      <LinkedResourceContainer subject={resource} onDone={close} />
    </Dialog>
  );
};

DialogManager.type = ontola.ns("dialog/Manager");

DialogManager.topology = allTopologies;

DialogManager.mapDataToProps = {
  resource: ontola.ns("dialog/resource"),
};
