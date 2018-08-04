import { TableCell, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import { LinkedPropType } from "link-redux";
import * as React from "react";

import { InfoListSectionTopology } from "../../../canvasses";
import { InfoListItem } from "../../../canvasses/InfoList/InfoListItem";
import { MediaContain } from "../../../components/MediaContain";
import { ImageTypes, ThingTypes } from "../../../helpers/types";

const styles = {
    tableCell: {
        textAlign: "center",
    },
} as StyleRules;

interface PropTypes extends WithStyles {
    linkedProp: LinkedPropType;
}

export class ImageInfoListSection extends React.PureComponent<PropTypes> {
    public static hocs = [withStyles(styles)];
    public static type = ThingTypes;
    public static property = ImageTypes;
    public static topology = InfoListSectionTopology;

    public render() {
        const { classes, linkedProp } = this.props;

        return (
            <InfoListItem>
                <TableCell classes={{ root: classes.tableCell }} colSpan={3}>
                    <MediaContain image={linkedProp.value} />
                </TableCell>
            </InfoListItem>
        );
    }
}
