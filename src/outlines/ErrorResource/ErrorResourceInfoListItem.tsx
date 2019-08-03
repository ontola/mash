import { LinkContext } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";
import { ArticleTableCellTopology, InfoListItemTopology } from "../../topologies";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import { LDLink } from "../../components/LDLink";
import { tryShorten } from "../../helpers/iris";
import { NS } from "../../LRS";

export class ErrorResourceInfoListItem extends React.PureComponent<LinkContext> {
    public static type = NS.ll("ErrorResource");

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
