import { Typography } from "@material-ui/core";
import * as React from "react";

import { CatchAllTypes, NameProps } from "../../helpers/types";

export const ThingName = ({ linkedProp }) => (
  <Typography
    color="inherit"
    component={"h1" as any}
    variant="h2"
  >
      {linkedProp.value}
  </Typography>
);

ThingName.type = CatchAllTypes;

ThingName.property = NameProps;
