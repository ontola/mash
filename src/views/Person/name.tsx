import { LinkedPropType } from "link-redux";
import * as React from "react";

import { ArticleTopology } from "../../canvasses";
import InfoListItemLabel from "../../components/InfoListItemLabel";
import InfoListItemText from "../../components/InfoListItemText";
import { NameTypes, PersonTypes } from "../../helpers/types";

interface PropTypes {
    linkedProp: LinkedPropType;
}

export class PersonNameArticle extends React.PureComponent<PropTypes> {
    public static type = PersonTypes;
    public static property = NameTypes;
    public static topology = ArticleTopology;

    public render() {
        return (
            <React.Fragment>
                <InfoListItemLabel>Name</InfoListItemLabel>
                <InfoListItemText>{this.props.linkedProp.value}</InfoListItemText>
            </React.Fragment>
        );
    }
}
