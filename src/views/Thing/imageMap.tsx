import { TableCell, Typography, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import LinkedRenderStore from "link-lib";
import { link } from "link-redux";
import * as React from "react";

import { InfoListTopology } from "../../canvasses";
import { MediaContain } from "../../components/MediaContain";
import { ThingTypes } from "../../helpers/types";
import { NS } from "../../LRS";

const styles = {
    infoListPropText: {
        textAlign: "center",
    },
} as StyleRules;

const ImageMapInfoListProp = ({ classes, imageMap, mapCaption }) => (
    <TableCell classes={classes.infoListTableCell} colSpan={3}>
        <MediaContain
            image={`https://commons.wikimedia.org/wiki/Special:FilePath/${imageMap.value}`}
        />
        <Typography className={classes.infoListPropText} variant="caption">{mapCaption.value}</Typography>
    </TableCell>
);

export default LinkedRenderStore.registerRenderer(
    link([NS.dbp("imageMap"), NS.dbp("mapCaption")])(withStyles(styles)(ImageMapInfoListProp)),
    ThingTypes,
    NS.dbp("imageMap"),
    InfoListTopology,
);
