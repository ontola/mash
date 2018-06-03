import LinkedRenderStore from "link-lib";
import * as React from "react";

import { NameTypes, PersonTypes } from "../../helpers/types";
import { ArticleTopology } from "../../canvasses";

const PersonName = ({ linkedProp }) => (
    <h1>{linkedProp.value}</h1>
);

export default LinkedRenderStore.registerRenderer(
    PersonName,
    PersonTypes,
    NameTypes,
    ArticleTopology,
);
