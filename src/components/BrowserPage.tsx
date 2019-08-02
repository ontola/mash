import { Grid, Icon, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AlignContentProperty, FlexDirectionProperty, PositionProperty } from "csstype";
import { LinkedResourceContainer, Property, Type } from "link-redux";
import * as React from "react";

import { Article } from "../canvasses/Article/Article";
import { DataGrid } from "../canvasses/DataGrid/DataGrid";
import { articleToWikiIRISet, iris } from "../helpers/iris";

import { NameProps } from "../helpers/types";
import { NS } from "../LRS";

const useStyles = makeStyles({
  articleWrapper: {
    alignContent: "space-around" as AlignContentProperty,
    display: "flow-root",
    flexDirection: "column" as FlexDirectionProperty,
    padding: "0 1em",
  },
  hiddenComp: {
    left: "800%",
    position: "fixed" as PositionProperty,
    top: "800%",
  },
});

export const BrowserPage = ({
  match: { params: { view = "page" } },
  location,
  history,
}) => {
  const classes = useStyles({});
  const { data, iri, page } = articleToWikiIRISet(location);

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

  const articleHref = iris.resource.expand({
    iri: new URLSearchParams(location.search).get("iri"),
    view: "page",
  });

  const dataHref = iris.resource.expand({
    iri: new URLSearchParams(location.search).get("iri"),
    view: "data",
  });

  const iframeHref = iris.resource.expand({
    iri: new URLSearchParams(location.search).get("iri"),
    view: "iframe",
  });

  return (
    <React.Fragment>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={`${location.pathname}${location.search}`}
        onChange={(e, value) => {
          if (value) {
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
          icon={<Icon>launch</Icon>}
          label="Open in new tab"
          onClick={() => window.open(page.value)}
        />
      </Tabs>
      <div className={classes.hiddenComp}>
        <LinkedResourceContainer subject={data}/>
      </div>
      <LinkedResourceContainer subject={iri}>
        <Grid container className={classes.articleWrapper} justify="center">
          <Property label={NS.dbo("wikiPageRedirects")}/>
          <Property label={NameProps}/>
          {displayComponent}
        </Grid>
      </LinkedResourceContainer>
    </React.Fragment>
  );
};
