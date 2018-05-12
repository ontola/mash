import ArrowForward from "@material-ui/icons/ArrowForward";
import { AlignContentProperty, FlexDirectionProperty, Globals, PositionProperty } from "csstype";
import { LinkedResourceContainer, Property, Type } from "link-redux";
import {
    AppBar,
    Grid,
    Icon,
    IconButton,
    Paper,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography,
    withStyles,
} from "material-ui";
import { StyleRules, WithStyles } from "material-ui/styles/withStyles";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { push } from "react-router-redux";

import { articleToDBPediaIRISet, dbpediaToWikiPath } from "../helpers/iris";
import { NameTypes } from "../helpers/types";
import { NS } from "../LRS";
import { Article } from "../topologies/Article";
import { DataGrid } from "../topologies/DataGrid";

const styles = {
    articleWrapper: {
        alignContent: "space-around" as AlignContentProperty,
        display: "flow-root",
        flexDirection: "column" as FlexDirectionProperty,
        padding: "0 1em",
    },
    header: {
        marginRight: "1em",
    },
    hiddenComp: {
        left: "800%",
        position: "fixed" as PositionProperty,
        top: "800%",
    },
    input: {
        color: "inherit" as Globals,
    },
} as StyleRules;

interface BrowserParams {
    article: string;
    view?: string;
}

interface PropTypes extends WithStyles, RouteComponentProps<BrowserParams> {
    onChange: (e: (e, dispatch) => void) => () => void;
    toArticle: () => void;
    toData: () => void;
}

class Browser extends React.PureComponent<PropTypes> {
    public handleChange(e, dispatch) {
        if (e.target.value) {
            const iri = NS.app(`wiki/${e.target.value.replace(/\s/g, "_")}`);
            const path = iri.value.replace(iri.site().value, "/");
            dispatch(push(path));
        }
    }

    public render() {
        const {
            classes,
            match: { params: { article, view = "page" } },
            onChange,
            toArticle,
            toData,
        } = this.props;
        const { data, iri, page } = articleToDBPediaIRISet(article || "");

        const displayComponent = view === "data"
            ? <DataGrid><Type /></DataGrid>
            : <Article><Type /></Article>;

        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.header} variant="title" color="inherit">
                            DBpedia
                        </Typography>
                        <TextField
                            fullWidth
                            InputProps={{ className: classes.input }}
                            InputLabelProps={{ className: classes.input }}
                            label="Look up an article"
                            onChange={onChange(this.handleChange)}
                        />
                        <IconButton color="inherit"><ArrowForward /></IconButton>
                    </Toolbar>
                </AppBar>
                <Paper>
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
                                <Property label={NS.dbo("wikiPageRedirects")}/>
                                <Property label={NameTypes}/>
                                    {displayComponent}
                            </Grid>
                    </LinkedResourceContainer>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    const curArticle = dbpediaToWikiPath(ownProps.match.params.article);

    return {
        onChange: (handle) => (e) => handle(e, dispatch),
        toArticle: () => dispatch(push(curArticle)),
        toData: () => dispatch(push(`${curArticle}/data`)),
    };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(Browser));
