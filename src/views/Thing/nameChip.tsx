import { Typography, WithStyles, withStyles } from "@material-ui/core";
import { LinkedPropType } from "link-redux";
import * as React from "react";

import { ChipTopology } from "../../canvasses";
import { NameProps, ThingTypes } from "../../helpers/types";

const styles = {
    chip: {
        maxWidth: 150,
    },
};

interface PropTypes extends WithStyles {
    linkedProp: LinkedPropType;
}

export class ThingNameChip extends React.PureComponent<PropTypes> {
    public static type = ThingTypes;
    public static property = NameProps;
    public static topology = ChipTopology;
    public static hocs = [withStyles(styles)];

    public render() {
        const { classes, linkedProp } = this.props;

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
    }
}
