import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import { Property, Type } from "link-redux";
import {
    Grid,
    TableRow,
} from "material-ui";
import * as React from "react";

import { ArticleLayout } from "../../components/ArticleLayout";
import InfoListItemLabel from "../../components/InfoListItemLabel";
import LDLink from "../../components/LDLink";
import {
    ImageTypes,
    NameTypes,
    TextTypes,
    ThingTypes,
} from "../../helpers/types";
import { NS } from "../../LRS";
import {
    ArticleTableCellTopology,
    ArticleTableTopology,
    ArticleTopology,
    DataGridCellListItemTopology,
    InfoListItemTopology,
    InfoListTopology,
} from "../../topologies";
import { ArticleTableCell } from "../../topologies/ArticleTableCell";
import { Chip } from "../../topologies/Chip";
import { InfoListItem } from "../../topologies/InfoListItem";

import properties from "./properties";
import ThingDataGrid from "./ThingDataGrid";

const ThingArticle = () => (
    <ArticleLayout>
      <Property label={TextTypes}/>
      <Property label={NS.schema("creator")}/>
    </ArticleLayout>
);

const ThingArticleTable = ({ cells }) => (
    <TableRow>
        {cells.map((c) => (
            <ArticleTableCell>
                <Property label={c} />
            </ArticleTableCell>
        ))}
    </TableRow>
);

const ThingInfoList = ({ label }) => (
    <Grid item xs>
        <InfoListItem>
            {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
            <Type />
        </InfoListItem>
    </Grid>
);

const ThingInfoListItem = () => (
    <LDLink>
        <Chip
            avatar={<Property label={ImageTypes} />}
            label={<Property label={NameTypes} />}
        />
    </LDLink>
);

export default [
    LinkedRenderStore.registerRenderer(
        ThingArticle,
        ThingTypes,
        RENDER_CLASS_NAME,
        ArticleTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ThingArticleTable,
        ThingTypes,
        RENDER_CLASS_NAME,
        ArticleTableTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ThingInfoListItem,
        ThingTypes,
        RENDER_CLASS_NAME,
        ArticleTableCellTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ThingInfoList,
        ThingTypes,
        RENDER_CLASS_NAME,
        InfoListTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ThingInfoListItem,
        ThingTypes,
        RENDER_CLASS_NAME,
        InfoListItemTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ({ subject }) => <LDLink>{subject.toString()}</LDLink>,
        ThingTypes,
        RENDER_CLASS_NAME,
        DataGridCellListItemTopology,
    ),
    ThingDataGrid,
    ...properties,
];
