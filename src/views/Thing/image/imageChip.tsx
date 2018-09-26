import { Avatar, WithStyles, withStyles } from "@material-ui/core";
import { LinkContextReceiverProps, LinkedPropType } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { ChipTopology } from "../../../canvasses";
import { ImageProps, ThingTypes } from "../../../helpers/types";
import { NS } from "../../../LRS";

const styles = {
    avatar: {
        height: 32,
        width: 32,
    },
};

interface PropTypes extends LinkContextReceiverProps, WithStyles {
    linkedProp: LinkedPropType;
}

export class ImageChip extends React.PureComponent<PropTypes> {
    public static wikiBaseURI = NS.p("").site().value;

    public static type = ThingTypes;

    public static property = ImageProps;

    public static topology = ChipTopology;

    public static hocs = [withStyles(styles)];

    public render() {
        const { classes, linkedProp, lrs } = this.props;

        const imgUrl = linkedProp.value.startsWith(ImageChip.wikiBaseURI)
            ? lrs.getResourceProperty(linkedProp as NamedNode, NS.p("statement/P18"))
            : linkedProp;

        return (
            <Avatar
                classes={{ root: classes.avatar }}
                src={imgUrl.value}
            />
        );
    }
}
