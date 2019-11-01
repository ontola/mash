import { Typography } from "@material-ui/core";
import * as React from "react";

import { CatchAllTypes, NameProps } from "../../helpers/types";
import { ArticleTopology } from "../../topologies";
import main from "../../topologies/main";

export const ThingName = ({ linkedProp }) => (
  <Typography
    color="inherit"
    component="h1"
    variant="h2"
  >
      {linkedProp.value}
  </Typography>
);

ThingName.type = CatchAllTypes;

ThingName.property = NameProps;

ThingName.topology = [
  ...main,
  ArticleTopology,
];
