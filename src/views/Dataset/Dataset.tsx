import schema from "@ontologies/schema";
import { Property } from "link-redux";
import * as React from "react";

import {
    ArticleTopology,
} from "../../topologies";

class DatasetArticle extends React.PureComponent {
    public static readonly type = schema.Dataset;

    public static readonly topology = ArticleTopology;

    public render() {
        return <Property label={schema.about} topology={null} />;
    }
}

export default DatasetArticle;
