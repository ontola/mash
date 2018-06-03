import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import { link } from "link-redux";
import * as React from "react";

import { NameTypes, PropertyTypes } from "../../helpers/types";
import { allTopologies } from "../../canvasses";

const PropertyArticleTableRow = ({ name }) => (
    <React.Fragment>
        {name ? name : "Unknown"}
    </React.Fragment>
);

export default [
    LinkedRenderStore.registerRenderer(
        link({
            name: {
                label: NameTypes,
            },
        }, {
            forceRender: true,
            returnType: "value",
        })(PropertyArticleTableRow),
        PropertyTypes,
        RENDER_CLASS_NAME,
        allTopologies,
    ),
];
