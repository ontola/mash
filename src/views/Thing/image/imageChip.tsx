import { Avatar, makeStyles } from "@material-ui/core";
import { useLRS } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { ChipTopology } from "../../../topologies";
import { ImageProps, ThingTypes } from "../../../helpers/types";
import { NS } from "../../../LRS";

const useStyles = makeStyles({
    avatar: {
        height: 32,
        width: 32,
    },
});

export const ImageChip = ({
  linkedProp,
}) => {
    const classes = useStyles({});
    const lrs = useLRS();
    const imgUrl = linkedProp.value.startsWith(ImageChip.wikiBaseURI)
      ? lrs.getResourceProperty(linkedProp as NamedNode, NS.p("statement/P18"))
      : linkedProp;

    return (
      <Avatar
        classes={{ root: classes.avatar }}
        src={imgUrl.value}
      />
    );
};

ImageChip.wikiBaseURI = NS.p("").site().value;

ImageChip.type = ThingTypes;

ImageChip.property = ImageProps;

ImageChip.topology = ChipTopology;
