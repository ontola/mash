import { createStyles, Grid, Icon, Tab, Tabs, withStyles, WithStyles } from "@material-ui/core";
import { push } from "connected-react-router";
import { AlignContentProperty, FlexDirectionProperty, PositionProperty } from "csstype";
import { LinkedResourceContainer, Property, Type } from "link-redux";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { Article } from "../canvasses/Article/Article";
import { DataGrid } from "../canvasses/DataGrid/DataGrid";
import { articleToWikiIRISet, iris, resourceToWikiPath } from "../helpers/iris";

import { NameProps } from "../helpers/types";
import { NS } from "../LRS";

const styles = createStyles({
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

interface DispatchProps {
    toArticle: () => void;
    toData: () => void;
}

interface BrowserParams {
    article: string;
    view?: string;
}

interface PropTypes extends DispatchProps, WithStyles, RouteComponentProps<BrowserParams>  {}

class BrowserPage extends React.PureComponent<PropTypes> {
    public render() {
        const {
            classes,
            match: { params: { view = "page" } },
            toArticle,
            toData,
        } = this.props;
        const { data, iri, page } = articleToWikiIRISet(this.props.location);

        const displayComponent = view === "data"
            ? <DataGrid><Type /></DataGrid>
            : <Article><Type /></Article>;

        return (
            <React.Fragment>
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    value={view}
                >
                    <Tab onClick={toArticle} icon={<Icon>art_track</Icon>} label="Readable page" value="page" />
                    <Tab onClick={toData} icon={<Icon>view_list</Icon>} label="Raw data" value="data" />
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
    }
}

const mapDispatchToProps = function(dispatch: Dispatch, ownProps): DispatchProps {
    const curArticle = resourceToWikiPath(ownProps.match.params.article);

    return {
        toArticle: () => dispatch(push(iris.resource.expand({
            iri: new URLSearchParams(ownProps.location.search).get("iri"),
            view: "page",
        }))),
        toData: () => {
            if (ownProps.match.url.startsWith("/resource")) {
                dispatch(push(iris.resource.expand({
                    iri: new URLSearchParams(ownProps.location.search).get("iri"),
                    view: "data",
                })));
            } else {
                dispatch(push(`${curArticle}/data`));
            }
        },
    };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(BrowserPage));
