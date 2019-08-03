import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { NamedNode } from "rdflib";
import * as React from "react";

import { DialogTopology } from "../../topologies";

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

export const ImageDialog = ({ subject }) => {
  const classes = useStyles({});

  return (
    <CardMedia
      className={classes.media}
      image={subject.value}
    />
  );
};

ImageDialog.type = [
  new NamedNode("http://www.w3.org/ns/iana/media-types/image/jpeg#Resource"),
];

ImageDialog.topology = DialogTopology;
