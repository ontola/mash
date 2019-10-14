import { Link } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import { Node } from "@ontologies/core";
import { useLinkRenderContext } from "link-redux";
import { MouseEvent, ReactNode } from "react";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

import { resourceToWikiPath } from "../helpers/iris";
import { TemplateContext } from "../helpers/templateContext";

export interface LDLinkProps extends TypographyProps {
  children?: ReactNode;
  className?: string;
  to?: Node | string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const LDLink = React.forwardRef((
  {
    className,
    children,
    to,
    onClick,
    ...rest
  }: LDLinkProps,
  ref,
) => {
  const template = React.useContext(TemplateContext);
  const { subject } = useLinkRenderContext();
  const toPath = resourceToWikiPath(to || subject, template);

  return (
    <Link
      className={className}
      component={RouterLink}
      innerRef={ref}
      to={toPath}
      onClick={onClick}
      underline="none"
      {...rest as any}
    >
      {children}
    </Link>
  );
}) as any;
