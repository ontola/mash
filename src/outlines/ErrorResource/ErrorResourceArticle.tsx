import { Typography } from "@material-ui/core";
import * as React from "react";
import { ArticleTopology } from "../../topologies";

import { ArticleLayout } from "../../components/ArticleLayout";
import { NS } from "../../LRS";

export class ErrorResourceArticle extends React.PureComponent {
    public static type = NS.ll("ErrorResource");

    public static topology = ArticleTopology;

    public render() {
        return (
            <ArticleLayout>
                <Typography variant="h1">Error</Typography>
            </ArticleLayout>
        );
    }
}
