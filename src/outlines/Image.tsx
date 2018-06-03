import LinkedRenderStore from "link-lib";
import { Avatar, Grid, TableCell, withStyles } from "material-ui";
import { StyleRules } from "material-ui/styles";
import * as React from "react";

import { allTopologiesExcept, ChipTopology, InfoListTopology } from "../canvasses";
import { MediaContain } from "../components/MediaContain";
import { ImageTypes, ThingTypes } from "../helpers/types";

const styles = {
    avatar: {
        height: 32,
        width: 32,
    },
    tableCell: {
        textAlign: "center",
    },
} as StyleRules;

const Image = ({ linkedProp }) => (
    <Grid>
        <MediaContain image={linkedProp.value} />
    </Grid>
);

const ImageInfoList = ({ classes, linkedProp }) => (
    <TableCell classes={{ root: classes.tableCell }} colSpan={3}>
        <MediaContain image={linkedProp.value} />
    </TableCell>
);

const ImageChip = ({ classes, linkedProp }) => (
    <Avatar
        classes={{ root: classes.avatar }}
        src={linkedProp.value}
    />
);

export default [
    LinkedRenderStore.registerRenderer(
        Image,
        ThingTypes,
        ImageTypes,
        allTopologiesExcept(ChipTopology, InfoListTopology),
    ),
    LinkedRenderStore.registerRenderer(
        withStyles(styles)(ImageInfoList),
        ThingTypes,
        ImageTypes,
        InfoListTopology,
    ),
    LinkedRenderStore.registerRenderer(
        withStyles(styles)(ImageChip),
        ThingTypes,
        ImageTypes,
        ChipTopology,
    ),
];
