import LinkedRenderStore from "link-lib";
import { Avatar, Grid, TableCell, withStyles } from "material-ui";
import * as React from "react";
import { MediaContain } from "../components/MediaContain";

import { ImageTypes, ThingTypes } from "../helpers/types";
import { allTopologiesExcept, ChipTopology, InfoListTopology } from "../topologies";
import { InfoListItem } from "../topologies/InfoListItem";

const styles = {
    avatar: {
        height: 32,
        width: 32,
    },
};

const Image = ({ linkedProp }) => (
    <Grid>
        <MediaContain image={linkedProp.value} />
    </Grid>
);

const ImageInfoList = ({ linkedProp }) => (
    <InfoListItem>
        <TableCell colSpan={2}>
            <MediaContain image={linkedProp.value} />
        </TableCell>
    </InfoListItem>
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
        ImageInfoList,
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
