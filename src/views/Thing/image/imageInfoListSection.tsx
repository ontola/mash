import { makeStyles, TableCell } from "@material-ui/core";
import { NamedNode } from "@ontologies/core";
import { useLRS } from "link-redux";
import { NamedNode as RDFlibNamedNode } from "rdflib";
import * as React from "react";

import { MediaContain } from "../../../components/MediaContain";
import { ImageProps, ThingTypes } from "../../../helpers/types";
import wdp from "../../../ontology/wdp";
import { InfoListSectionTopology } from "../../../topologies";
import { InfoListItem } from "../../../topologies/InfoList/InfoListItem";

const useStyles = makeStyles({
    tableCell: {
        textAlign: "center",
    },
});

const wikiBaseURI = RDFlibNamedNode.site(wdp.ns("")).value;

export const ImageInfoListSection = ({
  linkedProp,
}) => {
    const lrs = useLRS();
    const classes = useStyles({});

    const imgUrl = linkedProp.value.startsWith(wikiBaseURI)
      ? lrs.getResourceProperty(linkedProp as NamedNode, wdp.ns("statement/P18"))
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
