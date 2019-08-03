import { makeStyles, TableCell } from "@material-ui/core";
import { useLRS } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../../topologies";
import { InfoListItem } from "../../../topologies/InfoList/InfoListItem";
import { MediaContain } from "../../../components/MediaContain";
import { ImageProps, ThingTypes } from "../../../helpers/types";
import { NS } from "../../../LRS";

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center",
    },
});

const wikiBaseURI = NS.p("").site().value;

export const ImageInfoListSection = ({
  linkedProp,
}) => {
    const lrs = useLRS();
    const classes = useStyles({});

    const imgUrl = linkedProp.value.startsWith(wikiBaseURI)
      ? lrs.getResourceProperty(linkedProp as NamedNode, NS.p("statement/P18"))
      : linkedProp;

    return (
      <InfoListItem>
          <TableCell classes={{ root: classes.tableCell }} colSpan={3}>
              <MediaContain image={imgUrl.value} />
          </TableCell>
      </InfoListItem>
    );
};

ImageInfoListSection.type = ThingTypes;

ImageInfoListSection.property = ImageProps;

ImageInfoListSection.topology = InfoListSectionTopology;
