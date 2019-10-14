import { Literal } from "@ontologies/core";
import rdfs from "@ontologies/rdfs";
import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import { LDLink } from "../../components/LDLink";
import { PropertyTypes } from "../../helpers/types";
import { InfoListItemTopology } from "../../topologies";

interface LabelProp {
    label: Literal;
}

export class RDFSPropertyInfoListItem extends React.PureComponent<LabelProp> {
    public static type = PropertyTypes;

    public static topology = InfoListItemTopology;

    public static mapDataToProps = {
        label: rdfs.label,
    };

    public render() {
        const { label } = this.props;

        return (
            <InfoListItemLabel>
                <LDLink>
                    {label.value}
                </LDLink>
            </InfoListItemLabel>
        );
    }
}
