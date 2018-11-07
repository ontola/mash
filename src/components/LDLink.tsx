import {
    LinkContext,
    LinkCtxOverrides,
    SubjectProp,
    withLinkCtx,
} from "link-redux";
import { NamedNode } from "rdflib";
import { ReactNode } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import { resourceToWikiPath } from "../helpers/iris";

export interface LDLinkProps extends SubjectProp {
    children?: ReactNode;
    className?: string;
    to?: NamedNode | string;
}

class LDLink extends React.PureComponent<LDLinkProps & LinkContext & LinkCtxOverrides> {
    public render() {
        const { className, children, subject, to } = this.props;

        return (
            <Link
                className={className}
                to={resourceToWikiPath(to || subject)}
            >
                {children}
            </Link>
        );
    }
}
// @ts-ignore
export default withLinkCtx<LDLinkProps>(LDLink);
