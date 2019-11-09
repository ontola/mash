import { Grid, Icon, Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import rdfFactory from "@ontologies/core";
import {
  LinkedResourceContainer,
  Property,
  Type,
  useDataInvalidation,
  useLRS,
} from "link-redux";
import * as React from "react";
import template from "url-template";

import { articleToWikiIRISet } from "../helpers/iris";
import dbo from "../ontology/dbo";
import ll from "../ontology/ll";
import { Article } from "../topologies/Article/Article";
import { DataGrid } from "../topologies/DataGrid/DataGrid";
import { InstallableComponentChecker } from "./InstallableComponentChecker";

const iris = {
  resource: template.parse("/resource{/view}{?iri}"),
};

const useStyles = makeStyles({
  articleWrapper: {
    alignContent: "space-around",
    display: "flow-root",
    flexDirection: "column",
    padding: "0 1em",
  },
  hiddenComp: {
    left: "800%",
    position: "fixed",
    top: "800%",
  },
  tabCorrection: {
    marginBottom: "24px",
    marginTop: "-24px",
  },
});

export const BrowserPage = ({
  match: { params: { view = "page" } },
  location,
  history,
}) => {
  const lrs = useLRS();
  const classes = useStyles({});
  useDataInvalidation({
    subject: ll.ns("viewRegistrations"),
  });
  const { data, iri } = articleToWikiIRISet(location);

  let displayComponent;
  switch (view) {
    case "data":
      displayComponent = <DataGrid><Type/></DataGrid>;
      break;
    case "page":
      displayComponent = <Article><Type/></Article>;
      break;
    case "iframe":
      displayComponent = (
        <iframe
          src={iri.value}
          style={{ minHeight: "75vh", width: "100%" }}
        >
          Browser needs iframe support
        </iframe>
      );
      break;
    default:
      displayComponent = <p>Unknown page</p>;
  }

  const resource = new URLSearchParams(location.search).get("iri");

  const articleHref = iris.resource.expand({
    iri: resource,
    view: "page",
  });

  const dataHref = iris.resource.expand({
    iri: resource,
    view: "data",
  });

  const iframeHref = iris.resource.expand({
    iri: resource,
    view: "iframe",
  });

  React.useEffect(() => {
    const subject = rdfFactory.namedNode(resource);
    if (!subject.value.startsWith("about:") && lrs.getStatus(subject).status === null) {
      lrs.getEntity(subject);
    }
  }, [resource]);

  return (
    <React.Fragment>
      <Paper>
        <Tabs
          className={classes.tabCorrection}
          indicatorColor="primary"
          textColor="primary"
          value={`${location.pathname}${location.search}`}
          onChange={(e, value) => {
            if (value === "blank") {
              e.stopPropagation();
            } else if (value) {
              e.preventDefault();
              history.push(value);
            }
          }}
        >
          <Tab
            href={articleHref}
            icon={<Icon>art_track</Icon>}
            label="Readable page"
            value={articleHref}
          />
          <Tab
            href={dataHref}
            icon={<Icon>view_list</Icon>}
            label="Raw data"
            value={dataHref}
          />
          <Tab
            href={iframeHref}
            icon={<Icon>polymer</Icon>}
            label="iframe"
            value={iframeHref}
          />
          <Tab
            href={resource}
            target="_blank"
            icon={<Icon>launch</Icon>}
            label="Open in new tab"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            value="blank"
          />
        </Tabs>
      </Paper>
      <div className={classes.hiddenComp}>
        <LinkedResourceContainer subject={data} />
      </div>
      <LinkedResourceContainer forceRender subject={iri}>
        <Grid container className={classes.articleWrapper} justify="center">
          <Property label={dbo.ns("wikiPageRedirects")}/>
          {displayComponent}
        </Grid>
        <InstallableComponentChecker />
      </LinkedResourceContainer>
    </React.Fragment>
  );
};
