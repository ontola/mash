import { Link } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";
import { isNode, Node } from "@ontologies/core";
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
  const handlesExternals = template
    ? template.template.includes("iriHost")
    : false;
  const targetStr = (isNode(to) ? to.value : to) || subject.value;
  const appOrigin = window.location.origin;
  const targetOrigin = targetStr.includes(":")
    ? new URL(targetStr).origin
    : appOrigin;
  const isDiffOrigin = appOrigin !== targetOrigin;
  const newTab = handlesExternals
    ? false
    : isDiffOrigin;

  if (newTab) {
    return (
      <a
        className={className}
        href={targetStr}
        onClick={onClick}
        target="_blank"
        rel="nofollow noopener noreferrer"
        {...rest as any}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      className={className}
      component={RouterLink}
      innerRef={ref}
      to={resourceToWikiPath(to || subject, template)}
      onClick={onClick}
      underline="none"
      {...rest as any}
    >
      {children}
    </Link>
  );
}) as any;
