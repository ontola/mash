import { RENDER_CLASS_NAME } from "link-lib";
import { LinkContextReceiverProps, withLinkCtx } from "link-redux";
import { TypableBase } from "link-redux/dist/typings/components/Typable";
import { TypableInjectedProps } from "link-redux/dist/typings/components/Typable";
import { NamedNode } from "rdflib";
import { ComponentType } from "react";
import * as React from "react";

import { NS } from "../LRS";

interface PropTypes extends LinkContextReceiverProps, TypableInjectedProps {}

class TypeCollectorComp extends TypableBase<PropTypes> {
    public static displayName = "TypeCollector";

    public render() {
        const { lrs, subject } = this.props;

        const topology = this.topology();
        const property = RENDER_CLASS_NAME;
        // @ts-ignore
        const types = lrs.getResourceProperties(subject, NS.rdf("type"))
            .filter((node) => Object.prototype.hasOwnProperty.call(node, "sI"))
            // @ts-ignore
            .map((type: NamedNode) => lrs.mapping.getRenderComponent([type], [property], topology, NS.app("no-view")))
            .filter((v) => typeof v !== "undefined");
        const uniqueComponents = Array.from<ComponentType>(new Set(types));

        return (
            <React.Fragment>
                {uniqueComponents.map((Comp) => <Comp />)}
            </React.Fragment>
        );
    }
}

const TypeCollector = withLinkCtx(TypeCollectorComp);

export { TypeCollector };
