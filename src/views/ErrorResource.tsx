import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import { Type } from "link-redux";
import {
    Grid,
    Icon,
    Typography,
} from "material-ui";
import * as React from "react";

import { ArticleLayout } from "../components/ArticleLayout";
import InfoListItemLabel from "../components/InfoListItemLabel";
import LDLink from "../components/LDLink";
import { NS } from "../LRS";
import {
    ArticleTableCellTopology,
    ArticleTopology,
    InfoListItemTopology,
    InfoListTopology,
} from "../topologies";
import { Chip } from "../topologies/Chip";
import { InfoListItem } from "../topologies/InfoListItem";

const ErrorResourceArticle = () => (
    <ArticleLayout>
      <Typography variant="title">Error</Typography>
    </ArticleLayout>
);

const ErrorResourceInfoList = ({ label }) => (
    <Grid item xs>
        <InfoListItem>
            {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
            <Type />
        </InfoListItem>
    </Grid>
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
