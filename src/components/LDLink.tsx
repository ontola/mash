import { LinkContextReceiverProps, SubjectProp, withLinkCtx } from "link-redux";
import { NamedNode } from "rdflib";
import { ReactNode, StatelessComponent } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import { resourceToWikiPath } from "../helpers/iris";

export interface LDLinkProps extends SubjectProp, LinkContextReceiverProps {
    children?: ReactNode;
    className?: string;
    to?: NamedNode | string;
}

const LDLink: StatelessComponent<LDLinkProps> = ({ className, children, subject, to }) => (
    <Link
        className={className}
        to={resourceToWikiPath(to || subject)}
    >
        {children}
    </Link>
);

export default withLinkCtx<LDLinkProps>(LDLink);
