import { Type } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";
import { InfoListTopology } from "../../topologies";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import { NS } from "../../LRS";

interface PropTypes {
    label: NamedNode;
}

export class ErrorResourceInfoList extends React.PureComponent<PropTypes> {
    public static type = NS.ll("ErrorResource");

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
