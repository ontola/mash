import { TableCell, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import { InfoListTopology } from "../../canvasses";
import { MediaContain } from "../../components/MediaContain";
import { ThingTypes } from "../../helpers/types";
import { NS } from "../../LRS";

const useStyles = makeStyles({
    infoListPropText: {
        textAlign: "center",
    },
});

export const ImageMapInfoListProp = ({
  imageMap,
  mapCaption,
}) => {
    const classes = useStyles({});

    return (
        <TableCell colSpan={3}>
            <MediaContain
              image={`https://commons.wikimedia.org/wiki/Special:FilePath/${imageMap.value}`}
            />
            <Typography className={classes.infoListPropText} variant="caption">{mapCaption.value}</Typography>
        </TableCell>
    );
};

ImageMapInfoListProp.type = ThingTypes;

ImageMapInfoListProp.property = NS.dbp("imageMap");

ImageMapInfoListProp.topology = InfoListTopology;

ImageMapInfoListProp.mapDataToProps = [NS.dbp("imageMap"), NS.dbp("mapCaption")];
