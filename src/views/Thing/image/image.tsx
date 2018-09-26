import { Grid } from "@material-ui/core";
import { LinkedPropType } from "link-redux";
import * as React from "react";

import {
    allTopologiesExcept,
    ChipTopology,
    InfoListSectionTopology,
} from "../../../canvasses";
import { MediaContain } from "../../../components/MediaContain";
import { ImageProps, ThingTypes } from "../../../helpers/types";

interface PropTypes {
    linkedProp: LinkedPropType;
}

export class Image extends React.PureComponent<PropTypes> {
    public static type = ThingTypes;

    public static property = ImageProps;

    public static topology = allTopologiesExcept(ChipTopology, InfoListSectionTopology);

    public render() {
        const { linkedProp } = this.props;

        return (
            <Grid>
                <MediaContain image={linkedProp.value} />
            </Grid>
        );

    }
}
