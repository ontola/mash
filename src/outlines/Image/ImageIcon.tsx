import { makeStyles } from "@material-ui/styles";
import { NamedNode } from "rdflib";
import * as React from "react";

import { IconTopology } from "../../topologies";

const useStyles = makeStyles({
  root: {
    borderRadius: "999px",
    height: "100%",
  },
});

export const ImageIcon = ({ subject, ...rest }) =>{
  const classes = useStyles({});

  return (
    <img className={classes.root} src={subject.value} {...rest} />
  );
};

ImageIcon.type = [
  new NamedNode("http://www.w3.org/ns/iana/media-types/image/jpeg#Resource"),
];

ImageIcon.topology = IconTopology;
