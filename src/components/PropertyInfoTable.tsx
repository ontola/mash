import { Icon, Typography } from "@material-ui/core";
import { isDifferentOrigin, namedNodeByIRI, normalizeType } from "link-lib";
import { LabelType, LinkContextReceiverProps, PropertyBase, withLinkCtx } from "link-redux";
import { Statement } from "rdflib";
import * as React from "react";

export interface PropTypes extends LinkContextReceiverProps {
    label: LabelType;
}

class PropertyTableComp extends PropertyBase<PropTypes> {
    public renderItem(statement: Statement) {
        const object = statement.object;
        let rendering: React.ReactNode = null;
        if (object.termType === "NamedNode") {
            const extenal = isDifferentOrigin(object) && !new URL(object.value).origin.endsWith("dbpedia.org/");

            if (extenal) {
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
        const props = this.getLinkedObjectPropertyRaw(propType);

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
