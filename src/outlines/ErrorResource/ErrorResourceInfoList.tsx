import { NamedNode } from "@ontologies/core";
import { Type } from "link-redux";
import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import ll from "../../ontology/ll";
import { InfoListTopology } from "../../topologies";

interface PropTypes {
    label: NamedNode;
}

export class ErrorResourceInfoList extends React.PureComponent<PropTypes> {
    public static type = ll.ErrorResource;

    public static topology = InfoListTopology;

    public render() {
        const { label } = this.props;

        return (
            <React.Fragment>
                {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
                <Type />
            </React.Fragment>
        );
    }
}
