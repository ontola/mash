import { Icon, Typography } from "@material-ui/core";
import rdfFactory, { isNamedNode, Term } from "@ontologies/core";
import { isDifferentOrigin, normalizeType, rdflib } from "link-lib";
import { LabelType, LinkContext, LinkedResourceContainer, Property, withLinkCtx } from "link-redux";
import * as React from "react";

import { NameProps } from "../helpers/types";

export interface PropTypes extends LinkContext {
    label: LabelType;
}

class PropertyTableComp extends React.PureComponent<PropTypes> {
    public renderItem(object: Term) {
        let rendering: React.ReactNode = null;
        if (isNamedNode(object)) {
            const external = isDifferentOrigin(object) && !new URL(object.value).origin.endsWith("dbpedia.org/");

            if (external) {
                rendering = (
                  <React.Fragment>
                    <a href={object.value} target="_blank">{object.value}</a><Icon>launch</Icon>
                      {` on ${rdflib.site(rdfFactory.namedNode(new URL(object.value).toString()))}`}
                  </React.Fragment>
                );
            }
        }

        return (
            <Typography variant="body1">
                {rendering}
            </Typography>
        );
    }

    public render() {
        const { label } = this.props;
        const propType = normalizeType(label)[0];
        const props = this.props.lrs.getResourceProperties(this.props.subject, propType);

        if (props.length === 0) {
            return null;
        }

        return (
            <React.Fragment>
                <LinkedResourceContainer forceRender subject={propType}>
                    <Property label={NameProps}>
                        {([ name ]) => (
                            <Typography variant="h3">{name ? name.value : (propType as any).term}</Typography>
                        )}
                    </Property>
                </LinkedResourceContainer>
                {props.map(this.renderItem)}
            </React.Fragment>
        );
    }
}

// @ts-ignore
export const PropertyInfoTable = withLinkCtx(PropertyTableComp);
