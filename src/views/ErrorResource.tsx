import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import { Type } from "link-redux";
import {
    Grid,
    Icon,
    Typography,
} from "material-ui";
import * as React from "react";

import {
    ArticleTableCellTopology,
    ArticleTopology,
    InfoListItemTopology,
    InfoListTopology,
} from "../canvasses";
import { ArticleLayout } from "../components/ArticleLayout";
import InfoListItemLabel from "../components/InfoListItemLabel";
import LDLink from "../components/LDLink";
import { NS } from "../LRS";
import { Chip } from "../topologies/Chip";

const ErrorResourceArticle = () => (
    <ArticleLayout>
      <Typography variant="title">Error</Typography>
    </ArticleLayout>
);

const ErrorResourceInfoList = ({ label }) => (
    <React.Fragment>
        {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
        <Type />
    </React.Fragment>
);

const ErrorResourceInfoListItem = () => (
    <LDLink>
        <Chip
            avatar={<Icon>cross</Icon>}
        />
    </LDLink>
);

export default [
    LinkedRenderStore.registerRenderer(
        ErrorResourceArticle,
        NS.ll("ErrorResource"),
        RENDER_CLASS_NAME,
        ArticleTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ErrorResourceInfoList,
        NS.ll("ErrorResource"),
        RENDER_CLASS_NAME,
        InfoListTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ErrorResourceInfoListItem,
        NS.ll("ErrorResource"),
        RENDER_CLASS_NAME,
        ArticleTableCellTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ErrorResourceInfoListItem,
        NS.ll("ErrorResource"),
        RENDER_CLASS_NAME,
        InfoListItemTopology,
    ),
];
