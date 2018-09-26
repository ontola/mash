import { TableCell, Typography, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { LinkedPropType, LinkOpts } from "link-redux";
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

interface PropTypes extends LinkOpts {
    classes: any;
    imageMap: LinkedPropType;
    mapCaption: LinkedPropType;
}

class ImageMapInfoListProp extends React.PureComponent<PropTypes> {
    public static type = ThingTypes;

    public static property = NS.dbp("imageMap");

    public static topology = InfoListTopology;

    public static mapDataToProps = [NS.dbp("imageMap"), NS.dbp("mapCaption")];

    public static hocs = [withStyles(styles)];

    public render() {
        const { classes, imageMap, mapCaption } = this.props;

        return (
            <TableCell classes={classes.infoListTableCell} colSpan={3}>
                <MediaContain
                    image={`https://commons.wikimedia.org/wiki/Special:FilePath/${imageMap.value}`}
                />
                <Typography className={classes.infoListPropText} variant="caption">{mapCaption.value}</Typography>
            </TableCell>
        );
    }
}

export default ImageMapInfoListProp;
