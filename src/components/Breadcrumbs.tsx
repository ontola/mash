import { Breadcrumbs as BreadcrumbsComp, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { SubjectType, useLinkRenderContext } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";
import { LDLink } from "./LDLink";

export interface BreadcrumbsProps {
  subject?: SubjectType;
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1, 2),
  },
}));

export const Breadcrumbs = ({ subject: subjectProp }: BreadcrumbsProps) => {
  const classes = useStyles({});
  const { subject } = useLinkRenderContext();
  const subjectToShow = subjectProp || subject;

  if (!subjectToShow || subjectToShow.termType === "BlankNode") {
    return null;
  }

  const url = new URL(subjectToShow.value);
  const segments = [
    url.origin,
    ...url.pathname.split("/"),
  ].filter(Boolean);

  return (
    <Paper elevation={0} className={classes.paper}>
      <BreadcrumbsComp>
        {segments.map((segment, i) => {
          const key = `${subjectToShow.value}-${i}`;
          const isFinal = i === segments.length - 1;

          if (isFinal) {
            return (
              <Typography
                color="textPrimary"
                key={key}
              >
                {segment}
              </Typography>
            );
          }

          // SOLID pod server returns 500 without trailing slash for folders
          const trailing = isFinal ? "" : "/";
          const target = segments.slice(0, i + 1).join("/");

          return (
            <LDLink
              color="inherit"
              key={key}
              to={new NamedNode(`${target}${trailing}`)}
            >
              {segment}
            </LDLink>
          );
        })}
      </BreadcrumbsComp>
    </Paper>
  );
};
