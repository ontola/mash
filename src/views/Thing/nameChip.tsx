import { makeStyles, Typography } from "@material-ui/core";
import * as React from "react";

import { ChipTopology } from "../../canvasses";
import { NameProps, ThingTypes } from "../../helpers/types";

const useStyles = makeStyles({
    chip: {
        maxWidth: 150,
    },
});
const ThingNameChip = ({ linkedProp }) => {
    const classes = useStyles({});

    return (
      <Typography
        noWrap
        className={classes.chip}
        color="inherit"
        title={linkedProp.value}
        variant="body1"
      >
          {linkedProp.value}
      </Typography>
    );
};

ThingNameChip.type = ThingTypes;

ThingNameChip.property = NameProps;

ThingNameChip.topology = ChipTopology;
