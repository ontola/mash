import {
  AppBar,
  Icon,
  IconButton,
  InputBase,
  Toolbar,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { LinkedResourceContainer, Property } from "link-redux";
import * as React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { resourceToWikiPath } from "../helpers/iris";
import { NS } from "../LRS";
import { drawerWidth, LeftPanel } from "./LeftPanel";

import { SuggestionsList } from "./SuggestionsList";

const useStyles = makeStyles<any>((theme) => ({
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    color: "white",
    marginRight: "1em",
    textDecoration: "none",
  },
  homeLink: {
    color: "inherit",
    ["&:visited"]: {
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
    height: "100%",
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    maxWidth: "5rem",
    overflow: "hidden",
    transition: theme.transitions.create(["max-width", "margin", "padding-left", "padding-right"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  // To let these overrides work, they have to be defined after their counterparts (css precedence)
  // tslint:disable-next-line object-literal-sort-keys
  collapse: {
    maxWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  root: {
    display: "flex",
  },
  search: {
    ["&:hover"]: {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    color: "inherit",
    flexGrow: 1,
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
    display: "flex",
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
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

export const Browser = withRouter(({ children, history }) => {
  const classes = useStyles({});
  const [inputValue, setInputValue] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showLeftPanel, setShowLeftPanel] = React.useState(false);

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
      setShowSuggestions(false);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: showLeftPanel,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            className={clsx(classes.menuButton, showLeftPanel && classes.collapse)}
            color="inherit"
            edge="start"
            onClick={() => setShowLeftPanel(true)}
          >
            <MenuIcon />
          </IconButton>
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
            <SuggestionsList
              keyword={inputValue}
              showSuggestions={showSuggestions}
              onSelect={() => setShowSuggestions(false)}
              value={inputValue}
            />
          </div>
        </div>
        <LinkedResourceContainer
          subject={NS.solid("session/user")}
          topology={NS.solid("session/topology")}
        >
          <Property label={NS.solid("iri")} />
        </LinkedResourceContainer>
        </Toolbar>
      </AppBar>
      <LeftPanel
        open={showLeftPanel}
        setOpen={setShowLeftPanel}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
});
