import LinkedRenderStore from "link-lib";
import * as React from "react";
import { Typography, withStyles } from "material-ui";
import { InfoListItem } from "../../canvasses/InfoList/InfoListItem";

import { NameTypes, ThingTypes } from "../../helpers/types";
import { ChipTopology, InfoListTopology } from "../../canvasses";

const styles = {
    chip: {
        maxWidth: 100,
    },
};

const ThingName = ({ classes, linkedProp }) => (
    <Typography
        className={classes.header}
        color="inherit"
        variant="display4"
    >
        {linkedProp.value}
    </Typography>
);

const ThingNameChip = ({ classes, linkedProp }) => (
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

const ThingNameInfoList = ({ linkedProp }) => (
    <InfoListItem>
        <Typography paragraph color="inherit" variant="title">{linkedProp.value}</Typography>
    </InfoListItem>
);

export default [
    LinkedRenderStore.registerRenderer(
        withStyles(styles)(ThingName),
        ThingTypes,
        NameTypes,
    ),
    LinkedRenderStore.registerRenderer(
        withStyles(styles)(ThingNameChip),
        ThingTypes,
        NameTypes,
        ChipTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ThingNameInfoList,
        ThingTypes,
        NameTypes,
        InfoListTopology,
    ),
];
