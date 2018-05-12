import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import { Property } from "link-redux";
import * as React from "react";

import { ArticleLayout } from "../../components/ArticleLayout";
import { ImageTypes, NameTypes, PlaceTypes, TextTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { ArticleTopology, InfoListTopology } from "../../topologies";

import properties from "./properties";

const PlaceArticle = () => (
    <ArticleLayout>
        <Property label={TextTypes}/>
        <Property label={NS.dbp("quote")} />
        <Property label={NS.dbo("careerStation")} />
    </ArticleLayout>
);

const PlaceName = ({ linkedProp }) => (
    <h1>{linkedProp.value}</h1>
);

const PlaceInfoList = () => (
    <React.Fragment>
        <Property label={ImageTypes}/>

        <Property forceRender label={NS.app("bornInfo")}/>

        <Property label={NS.dbo("motto")} />
        <Property label={NS.foaf("nick")} />

        <Property label={NS.dbp("imageMap")} />
        <Property forceRender label={NS.app("coordinates")} />

        <Property label={NS.dbo("country")} />

        <Property label={NS.dbo("part")} />

        <Property label={NS.dbo("Place/height")} />

        <Property label={NS.dbp("totalgoals")} />
    </React.Fragment>
);

export default [
    LinkedRenderStore.registerRenderer(
        PlaceArticle,
        PlaceTypes,
        RENDER_CLASS_NAME,
        ArticleTopology,
    ),
    LinkedRenderStore.registerRenderer(
        PlaceName,
        PlaceTypes,
        NameTypes,
        ArticleTopology,
    ),
    LinkedRenderStore.registerRenderer(
        PlaceInfoList,
        PlaceTypes,
        RENDER_CLASS_NAME,
        InfoListTopology,
    ),
    ...properties,
];
