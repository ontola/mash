import { Grid } from "@material-ui/core";
import * as React from "react";

import {
    allTopologiesExcept,
    ChipTopology,
    InfoListSectionTopology,
} from "../../../topologies";
import { MediaContain } from "../../../components/MediaContain";
import { ImageProps, ThingTypes } from "../../../helpers/types";

export const Image = ({ linkedProp }) => (
  <Grid>
      <MediaContain image={linkedProp.value} />
  </Grid>
);

Image.type = ThingTypes;

Image.property = ImageProps;

Image.topology = allTopologiesExcept(ChipTopology, InfoListSectionTopology);
