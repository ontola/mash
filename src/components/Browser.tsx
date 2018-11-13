import {
    AppBar,
    createStyles,

    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Toolbar,
    Typography,
    withStyles,
} from "@material-ui/core";
import { WithStyles } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { push } from "connected-react-router";
import { Globals } from "csstype";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { RSAA } from "redux-api-middleware";

import { resourceToWikiPath } from "../helpers/iris";
import { BrowserState } from "../state/browser";

const styles = createStyles({
    header: {
        color: "white",
        marginRight: "1em",
        textDecoration: "none",
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

interface DispatchProps {
    onChange: (e: (e, dispatch) => void) => (e: any) => void;
}

const DBPEDA_AUTOCOMPLETE_BASE = "http://dbpedia.org/services/rdf/iriautocomplete.get?lbl=";

interface PropTypes extends BrowserState, DispatchProps, WithStyles {}

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
            onChange,
        } = this.props;

        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Link to="/">
                            <Typography className={classes.header} variant="title">
                                DBpedia
                            </Typography>
                        </Link>
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
                    {this.props.children}
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function({ browser: { showSuggestions, suggestions } }): Partial<BrowserState> {
    return { showSuggestions, suggestions };
};

const mapDispatchToProps = function(dispatch: Dispatch): DispatchProps {
    return {
        onChange: (handle) => (e: unknown) => handle(e, dispatch),
    };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Browser));
