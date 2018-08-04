import { Typography } from "@material-ui/core";
import { LinkedPropType } from "link-redux";
import * as React from "react";

import { CatchAllTypes, NameTypes } from "../../helpers/types";

interface PropTypes {
    linkedProp: LinkedPropType;
}

export class ThingName extends React.PureComponent<PropTypes> {
    public static type = CatchAllTypes;
    public static property = NameTypes;

    public render() {
        const { linkedProp } = this.props;

        return (
            <Typography
                color="inherit"
                variant="display3"
            >
                {linkedProp.value}
            </Typography>
        );
    }
}
