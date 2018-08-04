import { Avatar, WithStyles, withStyles } from "@material-ui/core";
import { LinkedPropType } from "link-redux";
import * as React from "react";

import { ChipTopology } from "../../../canvasses";
import { ImageTypes, ThingTypes } from "../../../helpers/types";

const styles = {
    avatar: {
        height: 32,
        width: 32,
    },
};

interface PropTypes extends WithStyles {
    linkedProp: LinkedPropType;
}

export class ImageChip extends React.PureComponent<PropTypes> {
    public static hocs = [withStyles(styles)];
    public static type = ThingTypes;
    public static property = ImageTypes;
    public static topology = ChipTopology;

    public render() {
        const { classes, linkedProp } = this.props;

        return (
            <Avatar
                classes={{ root: classes.avatar }}
                src={linkedProp.value}
            />
        );
    }
}
