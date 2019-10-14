import { TableCell, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";

import { MediaContain } from "../../components/MediaContain";
import { ThingTypes } from "../../helpers/types";
import dbp from "../../ontology/dbp";
import { InfoListTopology } from "../../topologies";

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

ImageMapInfoListProp.property = dbp.ns("imageMap");

ImageMapInfoListProp.topology = InfoListTopology;

ImageMapInfoListProp.mapDataToProps = {
  imageMap: dbp.ns("imageMap"),
  mapCaption: dbp.ns("mapCaption"),
};
