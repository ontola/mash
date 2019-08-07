import { Link } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import { useLinkRenderContext } from "link-redux";
import { SomeNode } from "rdflib";
import { MouseEvent, ReactNode } from "react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { resourceToWikiPath } from "../helpers/iris";

export interface LDLinkProps extends TypographyProps {
  children?: ReactNode;
  className?: string;
  to?: SomeNode | string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const LDLink = React.forwardRef<any>((
  {
    className,
    children,
    to,
    onClick,
    ...rest
  }: LDLinkProps,
  ref,
) => {
  const { subject } = useLinkRenderContext();

  return (
    <Link
      className={className}
      component={RouterLink}
      innerRef={ref}
      to={resourceToWikiPath(to || subject)}
      onClick={onClick}
      underline="none"
      {...rest}
    >
      {children}
    </Link>
  );
}) as React.FunctionComponent<LDLinkProps>;
