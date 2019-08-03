import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { ArticleTopology } from "../../topologies";

import { ArticleLayout } from "../../components/ArticleLayout";
import { NS } from "../../LRS";

export const LoadingResourceArticle = () => (
    <ArticleLayout>
        <CircularProgress />
    </ArticleLayout>
);

LoadingResourceArticle.type = NS.ll("LoadingResource");

LoadingResourceArticle.topology = ArticleTopology;
