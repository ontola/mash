import { TableCell, WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import {
    LinkContextReceiverProps,
    LinkedPropType,
} from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../../canvasses";
import { InfoListItem } from "../../../canvasses/InfoList/InfoListItem";
import { MediaContain } from "../../../components/MediaContain";
import { ImageProps, ThingTypes } from "../../../helpers/types";
import { NS } from "../../../LRS";

const styles = {
    tableCell: {
        textAlign: "center",
    },
} as StyleRules;

interface PropTypes extends LinkContextReceiverProps, WithStyles {
    linkedProp: LinkedPropType;
}

export class ImageInfoListSection extends React.PureComponent<PropTypes> {
    public static wikiBaseURI = NS.p("").site().value;

    public static type = ThingTypes;

    public static property = ImageProps;

    public static topology = InfoListSectionTopology;

    public static hocs = [withStyles(styles)];

    public render() {
        const { classes, linkedProp, lrs } = this.props;

        const imgUrl = linkedProp.value.startsWith(ImageInfoListSection.wikiBaseURI)
            ? lrs.getResourceProperty(linkedProp as NamedNode, NS.p("statement/P18"))
            : linkedProp;

        return (
            <InfoListItem>
                <TableCell classes={{ root: classes.tableCell }} colSpan={3}>
                    <MediaContain image={imgUrl.value} />
                </TableCell>
            </InfoListItem>
        );
    }
}
