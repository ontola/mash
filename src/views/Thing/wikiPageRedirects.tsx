import { push } from "connected-react-router";
import { SomeNode } from "link-lib";
import {LinkedResourceContainer, LinkOpts} from "link-redux";
import { PropertyPropTypes } from "link-redux/dist/typings/components/Property";
import * as React from "react";
import { connect } from "react-redux";

import { allTopologiesExcept } from "../../canvasses";
import { resourceToWikiPath } from "../../helpers/iris";
import { ThingTypes } from "../../helpers/types";
import { NS } from "../../LRS";

interface ThingWikiPageRedirectsArticleProps extends PropertyPropTypes {
    followRedirect: (e) => void;
}

export class ThingWikiPageRedirects extends React.PureComponent<LinkOpts> {
    public static type = ThingTypes;

    public static property = NS.dbo("wikiPageRedirects");

    public static topology = allTopologiesExcept(undefined);

    public render() {
        const { linkedProp } = this.props;

        return <LinkedResourceContainer subject={(linkedProp as SomeNode)} />;
    }
}

// tslint:disable-next-line max-classes-per-file
export class ThingWikiPageRedirectsArticle
    extends React.PureComponent<any & ThingWikiPageRedirectsArticleProps> {

    public static type = ThingTypes;

    public static property = NS.dbo("wikiPageRedirects");

    public static hocs = [
        connect(
            null,
            (dispatch) => ({
                followRedirect: (p) => dispatch(push(resourceToWikiPath(p))),
            }),
        ),
    ];

    public componentDidMount() {
        this.props.followRedirect(this.props.linkedProp);
    }
    public render() {
        return null;
    }
}
