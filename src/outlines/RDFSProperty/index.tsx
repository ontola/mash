import { Literal } from "rdflib";
import * as React from "react";

import { InfoListItemTopology } from "../../canvasses";
import InfoListItemLabel from "../../components/InfoListItemLabel";
import { LDLink } from "../../components/LDLink";
import { PropertyTypes } from "../../helpers/types";
import { NS } from "../../LRS";

interface LabelProp {
    label: Literal;
}

export class RDFSPropertyInfoListItem extends React.PureComponent<LabelProp> {
    public static type = PropertyTypes;

    public static topology = InfoListItemTopology;

    public static mapDataToProps = [NS.rdfs("label")];

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
