import {
    AppBar,
    createStyles,
    Grid,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography,
    withStyles,
} from "@material-ui/core";
import { WithStyles } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { AlignContentProperty, FlexDirectionProperty, Globals, PositionProperty } from "csstype";
import { LinkedResourceContainer, Property, Type } from "link-redux";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { push } from "react-router-redux";
import { Dispatch } from "redux";
import { RSAA } from "redux-api-middleware";

import { Article } from "../canvasses/Article/Article";
import { DataGrid } from "../canvasses/DataGrid/DataGrid";
import { articleToWikiIRISet, iris, resourceToWikiPath } from "../helpers/iris";
import { NameTypes } from "../helpers/types";
import { NS } from "../LRS";
import { BrowserState } from "../state/browser";

const styles = createStyles({
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
    searchWrapper: {
        flexGrow: 1,
        position: "relative",
    },
    suggestionsList: {
        maxHeight: "40em",
        overflowX: "hidden",
        position: "absolute",
        top: "3em",
        zIndex: 1,
    },
});

interface BrowserParams {
    article: string;
    view?: string;
}

interface DispatchProps {
    onChange: (e: (e, dispatch) => void) => (e: any) => void;
    toArticle: () => void;
    toData: () => void;
}

const DBPEDA_AUTOCOMPLETE_BASE = "http://dbpedia.org/services/rdf/iriautocomplete.get?lbl=";

interface PropTypes extends BrowserState, DispatchProps, WithStyles, RouteComponentProps<BrowserParams> {}

class Browser extends React.PureComponent<PropTypes> {
    public handleChange(e, dispatch) {
        if (e.target.value) {
            const target = encodeURIComponent(`${DBPEDA_AUTOCOMPLETE_BASE}${e.target.value}`);
            dispatch({
                [RSAA]: {
                    credentials: "omit",
                    endpoint: `/proxy?iri=${target}`,
                    method: "GET",
                    types: ["REQUEST", "SUCCESS", "FAILURE"],
                },
            });
        }
    }

    public select(e, dispatch) {
        dispatch(push(resourceToWikiPath(e)));
    }

    public suggestions(onChange) {
        const { classes, showSuggestions, suggestions } = this.props;
        if (!showSuggestions || suggestions.length === 0) {
            return null;
        }

        return (
            <Paper className={classes.suggestionsList}>
                <List>
                    {suggestions.map(([title, iri]) => (
                        <ListItem button key={`${title}-${iri}`} onClick={() => onChange(iri)}>
                            <ListItemText
                                primary={title}
                                secondary={iri}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    }

    public render() {
        const {
            classes,
            match: { params: { view = "page" } },
            onChange,
            toArticle,
            toData,
        } = this.props;
        const { data, iri, page } = articleToWikiIRISet(this.props.location);

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
                        <div className={classes.searchWrapper}>
                            <TextField
                                fullWidth
                                InputProps={{ className: classes.input }}
                                InputLabelProps={{ className: classes.input }}
                                label="Look up an article"
                                onChange={onChange(this.handleChange)}
                            />
                            {this.suggestions(onChange(this.select))}
                        </div>
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
                                <Property label={NS.dbo("wikiPageRedirects")} />
                                <Property label={NameTypes} />
                                {displayComponent}
                            </Grid>
                    </LinkedResourceContainer>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function({ browser: { showSuggestions, suggestions } }): Partial<BrowserState> {
    return { showSuggestions, suggestions };
};

const mapDispatchToProps = function(dispatch: Dispatch, ownProps): DispatchProps {
    const curArticle = resourceToWikiPath(ownProps.match.params.article);

    return {
        onChange: (handle) => (e: unknown) => handle(e, dispatch),
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Browser));
