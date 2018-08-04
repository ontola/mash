import { Typography } from "@material-ui/core";
import { LinkedPropType } from "link-redux";
import * as React from "react";
import { InfoListItem } from "../../canvasses/InfoList/InfoListItem";

import { InfoListTopology } from "../../canvasses";
import { NameTypes, ThingTypes } from "../../helpers/types";

interface PropTypes {
    linkedProp: LinkedPropType;
}

export class ThingNameInfoList extends React.PureComponent<PropTypes> {
    public static type = ThingTypes;
    public static property = NameTypes;
    public static topology = InfoListTopology;

    public render() {
        const { linkedProp } = this.props;

        return (
            <InfoListItem>
                <Typography paragraph color="inherit" variant="title">{linkedProp.value}</Typography>
            </InfoListItem>
        );
    }
}
