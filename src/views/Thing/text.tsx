import { Typography } from "@material-ui/core";
import * as React from "react";

import { ArticleTopology } from "../../topologies";
import { TextProps, ThingTypes } from "../../helpers/types";

export const ThingTextArticle = ({ linkedProp }) => (
  <Typography>{linkedProp.value}</Typography>
);

ThingTextArticle.type = ThingTypes;

ThingTextArticle.property = TextProps;

ThingTextArticle.topology = ArticleTopology;
