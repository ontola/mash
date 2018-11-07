import { Icon, Typography } from "@material-ui/core";
import { isDifferentOrigin, namedNodeByIRI, normalizeType } from "link-lib";
import { LabelType, LinkContext, withLinkCtx } from "link-redux";
import { SomeTerm } from "rdflib";
import * as React from "react";

export interface PropTypes extends LinkContext {
    label: LabelType;
}

class PropertyTableComp extends React.PureComponent<PropTypes> {
    public renderItem(object: SomeTerm) {
        let rendering: React.ReactNode = null;
        if (object.termType === "NamedNode") {
            const external = isDifferentOrigin(object) && !new URL(object.value).origin.endsWith("dbpedia.org/");

            if (external) {
                rendering = (
                  <React.Fragment>
                    <a href={object.value} target="_blank">{object.value}</a><Icon>launch</Icon>
                      {` on ${namedNodeByIRI(new URL(object.uri).toString()).site()}`}
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
                <Typography variant="headline">{propType.term}</Typography>
                {props.map(this.renderItem)}
            </React.Fragment>
        );
    }
}

// @ts-ignore
export const PropertyInfoTable = withLinkCtx(PropertyTableComp);
