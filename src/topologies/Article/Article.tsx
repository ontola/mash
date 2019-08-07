import { Grid } from "@material-ui/core";
import { TopologyProvider } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const ArticleTopology = NS.app("article");

export class Article extends TopologyProvider {
    constructor(props) {
        super(props);

        this.topology = ArticleTopology;
    }

    public render() {
        return this.wrap((
            <Grid
              container
              direction="column"
              justify="center"
              wrap="wrap-reverse"
            >
                {this.props.children}
            </Grid>
        ));
    }
}
