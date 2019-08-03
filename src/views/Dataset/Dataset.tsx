import { Property } from "link-redux";
import * as React from "react";

import {
    ArticleTopology,
} from "../../topologies";
import { NS } from "../../LRS";

class DatasetArticle extends React.PureComponent {
    public static readonly type = NS.schema("Dataset");

    public static readonly topology = ArticleTopology;

    public render() {
        return <Property label={NS.schema("about")} topology={null} />;
    }
}

export default DatasetArticle;
