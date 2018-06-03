import LinkedRenderStore from "link-lib";
import * as React from "react";
import { Typography } from "material-ui";

import { TextTypes, ThingTypes } from "../../helpers/types";
import { ArticleTopology } from "../../canvasses";

const ThingTextArticle = ({ linkedProp }) => (
    <Typography>{linkedProp.value}</Typography>
);

export default LinkedRenderStore.registerRenderer(
    ThingTextArticle,
    ThingTypes,
    TextTypes,
    ArticleTopology,
);
