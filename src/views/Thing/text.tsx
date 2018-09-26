import { Typography } from "@material-ui/core";
import { LinkOpts } from "link-redux";
import * as React from "react";

import { ArticleTopology } from "../../canvasses";
import { TextProps, ThingTypes } from "../../helpers/types";

export class ThingTextArticle extends React.PureComponent<LinkOpts> {
    public static type = ThingTypes;

    public static property = TextProps;

    public static topology = ArticleTopology;

    public render() {
        const { linkedProp } = this.props;

        return <Typography>{linkedProp.value}</Typography>;
    }
}
