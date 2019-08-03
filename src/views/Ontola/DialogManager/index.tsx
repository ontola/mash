import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { NS } from "../../../LRS";
import { allTopologies } from "../../../topologies";
import { Dialog } from "../../../topologies/Ontola/Dialog";

export const DialogManager = (props) => {
  const item = props["dialog/resource"];

  const close = () => props.lrs.exec(NS.ontola("actions/dialog/close"));

  return (
    <Dialog open={!!item} onClose={close}>
      <LinkedResourceContainer subject={item} onDone={close} />
    </Dialog>
  );
};

DialogManager.type = NS.ontola("dialog/Manager");

DialogManager.topology = allTopologies;

DialogManager.mapDataToProps = [NS.ontola("dialog/resource")];
