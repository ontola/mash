import {
  Button,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { MenuProps } from "@material-ui/core/Menu";
import { PopperProps } from "@material-ui/core/Popper";
import clsx from "clsx";
import { NamedNode } from "rdflib";
import * as React from "react";

import { useStorage } from "../hooks/useStorage";
import { LDLink } from "./LDLink";

export const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    whiteSpace: "nowrap",
    width: drawerWidth,
  },
  drawerClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    width: theme.spacing(7) + 1,
  },
  drawerOpen: {
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: drawerWidth,
  },
  toolbar: {
    alignSelf: "flex-end",
    display: "flex",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

const PopperMenu = Menu as React.ComponentType<MenuProps & PopperProps>;

export const LeftPanel = ({ open, setOpen }) => {
  const classes = useStyles({});
  const storage = useStorage();
  const [ anchorEl, setAnchorEl ] = React.useState();

  const close = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const storageProps = storage
    ? ({
      component: LDLink,
      to: storage,
    })
    : ({
      component: Button,
      disabled: true,
    });

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={close}>
        {<Icon>chevron_left</Icon>}
      </IconButton>
      </div>
      <Divider />
      <List>
        <Tooltip
          title="Extensions"
          placement="right"
          TransitionComponent={Zoom}
        >
          <ListItem
            button
            component={LDLink}
            to={new NamedNode("about:extensions")}
            onClick={close}
          >
            <ListItemIcon>
              <Icon>extension</Icon>
            </ListItemIcon>
            <ListItemText primary="Extensions" />
          </ListItem>
        </Tooltip>
        <Tooltip
          title={storage ? "My pod" : "Login to see your storage"}
          placement="right"
          TransitionComponent={Zoom}
        >
          <span>
            <ListItem
              button
              to={storage}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                e.preventDefault();
              }}
              {...storageProps}
            >
              <ListItemIcon>
                <Icon>storage</Icon>
              </ListItemIcon>
              <ListItemText primary="Storage" />
            </ListItem>
          </span>
        </Tooltip>
        <Tooltip
          title="Bookmarks"
          placement="right"
          TransitionComponent={Zoom}
        >
          <ListItem
            button
            component={LDLink}
            to={new NamedNode("about:bookmarks")}
            onClick={close}
          >
              <ListItemIcon>
                <Icon>bookmarks</Icon>
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
          </ListItem>
        </Tooltip>
      </List>
      <PopperMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        placement="right-start"
        onClose={() => setAnchorEl(null)}
      >
        <ListItem
          button
          component={LDLink}
          to={storage && new NamedNode(`${storage.value}profile/card#me`)}
          onClick={close}
        >
          <ListItemIcon>
            <Icon>account_box</Icon>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem
          button
          component={LDLink}
          to={storage && new NamedNode(`${storage.value}public/`)}
          onClick={close}
        >
          <ListItemIcon>
            <Icon>public</Icon>
          </ListItemIcon>
          <ListItemText primary="Public folder" />
        </ListItem>
        <ListItem
          button
          component={LDLink}
          to={storage && new NamedNode(`${storage.value}private/`)}
          onClick={close}
        >
          <ListItemIcon>
            <Icon>storage</Icon>
          </ListItemIcon>
          <ListItemText primary="Private folder" />
        </ListItem>
      </PopperMenu>
    </Drawer>
  );
};
