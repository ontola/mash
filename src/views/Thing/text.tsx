import { Typography } from "@material-ui/core";
import * as React from "react";

import { ArticleTopology } from "../../canvasses";
import { TextProps, ThingTypes } from "../../helpers/types";

export const ThingTextArticle = ({ linkedProp }) => (
  <Typography>{linkedProp.value}</Typography>
);

ThingTextArticle.type = ThingTypes;

ThingTextArticle.property = TextProps;

ThingTextArticle.topology = ArticleTopology;
