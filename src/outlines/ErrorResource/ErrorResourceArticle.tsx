import { Typography } from "@material-ui/core";
import * as React from "react";

import { ArticleLayout } from "../../components/ArticleLayout";
import ll from "../../ontology/ll";
import { ArticleTopology } from "../../topologies";

export class ErrorResourceArticle extends React.PureComponent {
    public static type = ll.ns("ErrorResource");

    public static topology = ArticleTopology;

    public render() {
        return (
            <ArticleLayout>
                <Typography variant="h1">Error</Typography>
            </ArticleLayout>
        );
    }
}
