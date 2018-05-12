import { TopologyProvider } from "link-redux";
import { Grid } from "material-ui";
import * as React from "react";

import { NS } from "../LRS";

export const ArticleTopology = NS.app("article");

export class Article extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = ArticleTopology;
    }

    public render() {
        return (
            <Grid container justify="center" wrap="wrap-reverse">
                {this.props.children}
            </Grid>
        );
    }
}
