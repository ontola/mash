import { SomeNode } from "link-lib";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { allTopologiesExcept } from "../../topologies";
import { ThingTypes } from "../../helpers/types";
import { NS } from "../../LRS";

export const ThingWikiPageRedirects = ({ linkedProp }) => (
  <LinkedResourceContainer subject={(linkedProp as SomeNode)} />
);

ThingWikiPageRedirects.type = ThingTypes;

ThingWikiPageRedirects.property = NS.dbo("wikiPageRedirects");

ThingWikiPageRedirects.topology = allTopologiesExcept(undefined);

// export const ThingWikiPageRedirectsArticle = () =>
//
// // tslint:disable-next-line max-classes-per-file
// export class ThingWikiPageRedirectsArticle
//     extends React.PureComponent<any & ThingWikiPageRedirectsArticleProps> {
//
//     public static type = ThingTypes;
//
//     public static property = NS.dbo("wikiPageRedirects");
//
//     public static hocs = [
//         connect(
//             null,
//             (dispatch) => ({
//                 followRedirect: (p) => dispatch(push(resourceToWikiPath(p))),
//             }),
//         ),
//     ];
//
//     public componentDidMount() {
//         this.props.followRedirect(this.props.linkedProp);
//     }
//     public render() {
//         return null;
//     }
// }
