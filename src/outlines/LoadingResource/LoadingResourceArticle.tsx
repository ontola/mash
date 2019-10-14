import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import ll from "../../ontology/ll";
import { ArticleTopology } from "../../topologies";

import { ArticleLayout } from "../../components/ArticleLayout";

export const LoadingResourceArticle = () => (
    <ArticleLayout>
        <CircularProgress />
    </ArticleLayout>
);

LoadingResourceArticle.type = ll.ns("LoadingResource");

LoadingResourceArticle.topology = ArticleTopology;
