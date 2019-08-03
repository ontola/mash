import {
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";

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
    alignItems: "center",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
}));

export const LeftPanel = ({ open, setOpen }) => {
  const classes = useStyles({});

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
        <IconButton onClick={() => setOpen(false)}>
          {<Icon>chevron_left</Icon>}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemIcon>
            <Icon>star</Icon>
          </ListItemIcon>
          <ListItemText primary="Chelsea Otakan" />
        </ListItem>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemIcon>
            <Icon>bookmarks</Icon>
          </ListItemIcon>
          <ListItemText primary="Bookmarks" />
        </ListItem>
      </List>
    </Drawer>
  );
};
