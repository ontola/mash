import { Typography } from "@material-ui/core";
import * as React from "react";
import { InfoListItem } from "../../topologies/InfoList/InfoListItem";

import { InfoListTopology } from "../../topologies";
import { NameProps, ThingTypes } from "../../helpers/types";

export const ThingNameInfoList = ({ linkedProp }) => (
  <InfoListItem>
      <Typography paragraph color="inherit" variant="h4">
          {linkedProp.value}
      </Typography>
  </InfoListItem>
);

ThingNameInfoList.type = ThingTypes;

ThingNameInfoList.property = NameProps;

ThingNameInfoList.topology = InfoListTopology;
