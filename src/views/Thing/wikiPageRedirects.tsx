import LinkedRenderStore from "link-lib";
import { LinkedResourceContainer } from "link-redux";
import { PropertyPropTypes } from "link-redux/dist/typings/react/components/Property";
import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import { resourceToWikiPath } from "../../helpers/iris";
import { ThingTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { allTopologiesExcept } from "../../canvasses";

interface ThingWikiPageRedirectsArticleProps extends PropertyPropTypes {
    followRedirect: (e) => void;
}

const ThingWikiPageRedirects = ({ linkedProp }) => (
    <LinkedResourceContainer subject={linkedProp} />
);

class ThingWikiPageRedirectsArticle extends React.PureComponent<any & ThingWikiPageRedirectsArticleProps> {
    public componentDidMount() {
        this.props.followRedirect(this.props.linkedProp);
    }
    public render() {
        return null;
    }
}

export default [
    LinkedRenderStore.registerRenderer(
        ThingWikiPageRedirects,
        ThingTypes,
        NS.dbo("wikiPageRedirects"),
        allTopologiesExcept(undefined),
    ),
    LinkedRenderStore.registerRenderer(
        connect(
            null,
            (dispatch) => ({
                followRedirect: (p) => dispatch(push(resourceToWikiPath(p))),
            }),
        )(ThingWikiPageRedirectsArticle),
        ThingTypes,
        NS.dbo("wikiPageRedirects"),
    ),
];
