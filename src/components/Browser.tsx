import {
  AppBar,
  Icon,
  InputBase,
  Paper,
  Toolbar,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { resourceToWikiPath } from "../helpers/iris";

import { SuggestionsList } from "./SuggestionsList";

const useStyles = makeStyles<any>((theme) => ({
  header: {
    color: "white",
    marginRight: "1em",
    textDecoration: "none",
  },
  homeLink: {
    "&:visited": {
      color: "inherit",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  search: {
    ["&:hover"]: {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    color: "inherit",
    marginLeft: 0,
    marginRight: theme.spacing(2),
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
    width: "100%",
  },
  searchIcon: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    pointerEvents: "none",
    position: "absolute",
    width: theme.spacing(7),
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
}));

export const Browser = withRouter(({ children, history }) => {
  const classes = useStyles({});
  const [inputValue, setInputValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const update = (e) => {
    const value = e.target.value;

    setInputValue(value);
    if (!value || value.length === 0) {
      setShowSuggestions(false);
    } else if (value.length >= 3) {
      setShowSuggestions(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      history.push(resourceToWikiPath(e.target.value));
    }
  };

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Link className={classes.homeLink} to="/">
            <Icon>home</Icon>
          </Link>
          <div className={classes.searchWrapper}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                classes={{
                  input: classes.inputInput,
                  root: classes.inputRoot,
                }}
                placeholder="Search or type an url…"
                type="search"
                value={inputValue}
                onKeyUp={handleKeyUp}
                onChange={update}
              />
            </div>
            <SuggestionsList
              keyword={inputValue}
              showSuggestions={showSuggestions}
              onSelect={() => setShowSuggestions(false)}
              value={inputValue}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Paper>
        {children}
      </Paper>
    </React.Fragment>
  );
});
