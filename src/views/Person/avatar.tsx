import { Avatar, makeStyles } from "@material-ui/core";
import * as React from "react";

import {
  ImageProps,
  NameProps,
  PersonTypes,
} from "../../helpers/types";
import { stringToColor } from "../../helpers/ui";
import app from "../../ontology/app";
import vcard from "../../ontology/vcard";
import main from "../../topologies/main";

const useStyles = makeStyles({
  avatar: {
    fontSize: "5em",
    height: "2em",
    margin: 10,
    width: "2em",
  },
});

export const PersonAvatar = ({
  image,
  name,
}) => {
  const classes = useStyles({});

  if (!image && !name) {
    return null;
  }

  const shortName = name?.value
    ?.split(" ")
    ?.map((s) => s[0])
    ?.join("");

  return (
    <Avatar
      style={{
        backgroundColor: stringToColor(name?.value),
      }}
      className={classes.avatar}
      src={image?.value}
    >
      {shortName}
    </Avatar>
  );
};

PersonAvatar.type = PersonTypes;

PersonAvatar.property = app.ns("avatar");

PersonAvatar.topology = main;

PersonAvatar.mapDataToProps = {
  image: ImageProps,
  name: [vcard.ns("fn"), ...NameProps],
};

PersonAvatar.linkOpts = {
  forceRender: true,
};
