import { Grid, Icon } from "@material-ui/core";
import * as React from "react";

import { MediaContain } from "../../../components/MediaContain";
import { ImageProps, ThingTypes } from "../../../helpers/types";
import {
    allTopologiesExcept,
    ChipTopology,
    InfoListSectionTopology,
} from "../../../topologies";

export const Image = ({ linkedProp }) => {
  if (linkedProp.value.startsWith("https://material.io/resources/icons/")) {
    return (
      <Icon>{linkedProp.value.split("/").pop()}</Icon>
    );
  }

  return (
    <Grid>
        <MediaContain image={linkedProp.value} />
    </Grid>
  );
};

Image.type = ThingTypes;

Image.property = ImageProps;

Image.topology = allTopologiesExcept(ChipTopology, InfoListSectionTopology);
