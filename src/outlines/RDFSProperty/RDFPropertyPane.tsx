import { Typography } from "@material-ui/core";
import * as React from "react";

import { NameProps, PropertyTypes } from "../../helpers/types";
import { PaneTopology } from "../../topologies";

export const RDFPropertyPane = ({ label, subject }) => (
  <Typography variant="h6">
    {label ? label.value : subject?.value}
  </Typography>
);

RDFPropertyPane.type = PropertyTypes;

RDFPropertyPane.topology = PaneTopology;

RDFPropertyPane.mapDataToProps = {
  label: NameProps,
};

RDFPropertyPane.linkOpts = {
  forceRender: true,
};
