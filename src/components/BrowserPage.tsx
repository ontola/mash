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

const BrowserPage = ({
  match: { params: { view = "page" } },
  location,
}) => {
    const classes = useStyles({});
    const { data, iri, page } = articleToWikiIRISet(location);

    const displayComponent = view === "data"
      ? <DataGrid><Type /></DataGrid>
      : <Article><Type /></Article>;

    const articleHref = iris.resource.expand({
      iri: new URLSearchParams(location.search).get("iri"),
      view: "page",
    });

    const dataHref = iris.resource.expand({
      iri: new URLSearchParams(location.search).get("iri"),
      view: "data",
    });

    return (
      <React.Fragment>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={view}
          >
              <Tab
                href={articleHref}
                icon={<Icon>art_track</Icon>}
                label="Readable page"
                value="page"
              />
              <Tab
                href={dataHref}
                icon={<Icon>view_list</Icon>}
                label="Raw data"
                value="data"
              />
              <Tab
                icon={<Icon>launch</Icon>}
                label="Show on dbpedia"
                onClick={() => window.open(page.value)}
              />
          </Tabs>
          <div className={classes.hiddenComp}>
              <LinkedResourceContainer subject={data} />
          </div>
          <LinkedResourceContainer subject={iri}>
              <Grid container className={classes.articleWrapper} justify="center">
                  <Property label={NS.dbo("wikiPageRedirects")} />
                  <Property label={NameProps} />
                  {displayComponent}
              </Grid>
          </LinkedResourceContainer>
      </React.Fragment>
    );
};

// const mapDispatchToProps = function(dispatch: Dispatch, ownProps): DispatchProps {
//     const curArticle = resourceToWikiPath(ownProps.match.params.article);
//
//     return {
//         toArticle: () => dispatch(push(iris.resource.expand({
//             iri: new URLSearchParams(ownProps.location.search).get("iri"),
//             view: "page",
//         }))),
//         toData: () => {
//             if (ownProps.match.url.startsWith("/resource")) {
//                 dispatch(push(iris.resource.expand({
//                     iri: new URLSearchParams(ownProps.location.search).get("iri"),
//                     view: "data",
//                 })));
//             } else {
//                 dispatch(push(`${curArticle}/data`));
//             }
//         },
//     };
// };

export default BrowserPage;
