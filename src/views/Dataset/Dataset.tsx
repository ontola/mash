import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import { Property } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";
import {
    ArticleTopology,
} from "../../canvasses";

const DatasetArticle = () => (
  <Property label={NS.schema("about")} topology={null} />
);

export default [
    LinkedRenderStore.registerRenderer(
        DatasetArticle,
        NS.schema("Dataset"),
        RENDER_CLASS_NAME,
        ArticleTopology,
    ),
];
