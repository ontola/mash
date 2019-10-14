import { NamedNode } from "@ontologies/core";
import { LinkContext } from "link-redux";
import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import { LDLink } from "../../components/LDLink";
import { tryShorten } from "../../helpers/iris";
import ll from "../../ontology/ll";
import { ArticleTableCellTopology, InfoListItemTopology } from "../../topologies";

export class ErrorResourceInfoListItem extends React.PureComponent<LinkContext> {
    public static type = ll.ns("ErrorResource");

    public static topology = [
        ArticleTableCellTopology,
        InfoListItemTopology,
    ];

    public render() {
        const { subject } = this.props;

        // We're probably trying to render a property label without data (usually the app ontology or ontologies without
        // server backing like foaf)
        return (
            <InfoListItemLabel>
                <LDLink to={subject}>
                    {tryShorten(subject as NamedNode)}
                </LDLink>
            </InfoListItemLabel>
        );
    }
}
