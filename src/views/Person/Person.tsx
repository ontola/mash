import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import { Property } from "link-redux";
import * as React from "react";

import { ArticleLayout } from "../../components/ArticleLayout";
import { ImageTypes, NameTypes, PersonTypes, TextTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { ArticleTopology, InfoListTopology } from "../../topologies";

import properties from "./properties";

const PersonArticle = () => (
    <ArticleLayout>
        <Property label={TextTypes}/>
        <Property label={NS.dbp("quote")} />
        <Property label={NS.dbo("careerStation")} />
    </ArticleLayout>
);

const PersonName = ({ linkedProp }) => (
    <h1>{linkedProp.value}</h1>
);

const PersonInfoList = () => (
    <React.Fragment>
        <Property label={ImageTypes}/>
        <Property forceRender label={NS.app("bornInfo")}/>
        <Property forceRender label={NS.app("deathInfo")}/>
        <Property label={NS.foaf("gender")} />
        <Property label={NS.dbo("occupation")} />
        <Property label={NS.dbo("nationality")} />
        <Property label={NS.dbo("almaMater")} />
        <Property label={NS.dbo("spouse")} />
        <Property label={NS.dbo("children")} />

        <Property label={NS.dbo("Person/height")} />

        <Property label={NS.dbp("totalgoals")} />
    </React.Fragment>
);

export default [
    LinkedRenderStore.registerRenderer(
        PersonArticle,
        PersonTypes,
        RENDER_CLASS_NAME,
        ArticleTopology,
    ),
    LinkedRenderStore.registerRenderer(
        PersonName,
        PersonTypes,
        NameTypes,
        ArticleTopology,
    ),
    LinkedRenderStore.registerRenderer(
        PersonInfoList,
        PersonTypes,
        RENDER_CLASS_NAME,
        InfoListTopology,
    ),
    ...properties,
];
