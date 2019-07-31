import { useLinkRenderContext } from "link-redux";
import { SomeNode } from "rdflib";
import { MouseEvent, ReactNode } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import { resourceToWikiPath } from "../helpers/iris";

export interface LDLinkProps {
  children?: ReactNode;
  className?: string;
  to?: SomeNode | string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const LDLink = React.forwardRef(({
  className,
  children,
  to,
  onClick,
  ...rest
}: LDLinkProps) => {
  const { subject } = useLinkRenderContext();

  return (
    <Link
      className={className}
      to={resourceToWikiPath(to || subject)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Link>
  );
});
