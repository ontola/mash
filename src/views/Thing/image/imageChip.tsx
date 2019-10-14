import { Avatar, makeStyles } from "@material-ui/core";
import { NamedNode } from "@ontologies/core";
import { rdflib } from "link-lib";
import { useLRS } from "link-redux";
import * as React from "react";

import { ImageProps, ThingTypes } from "../../../helpers/types";
import wdp from "../../../ontology/wdp";
import { ChipTopology } from "../../../topologies";

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
      ? lrs.getResourceProperty(linkedProp as NamedNode, wdp.ns("statement/P18"))
      : linkedProp;

    return (
      <Avatar
        classes={{ root: classes.avatar }}
        src={imgUrl.value}
      />
    );
};

ImageChip.wikiBaseURI = rdflib.site(wdp.ns("")).value;

ImageChip.type = ThingTypes;

ImageChip.property = ImageProps;

ImageChip.topology = ChipTopology;
