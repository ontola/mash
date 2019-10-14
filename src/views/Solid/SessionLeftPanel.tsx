import { Menu, MenuItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle } from "@material-ui/icons";
import foaf from "@ontologies/foaf";
import schema from "@ontologies/schema";
import { LinkedResourceContainer, useLRS } from "link-redux";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { ImageProps, NameProps } from "../../helpers/types";
import solidActions from "../../ontology/solidActions";
import { Icon } from "../../topologies/Icon";

export const SessionLeftPanel = ({ image, name, subject }) => {
  const lrs = useLRS();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isGuest = subject === solidActions.ns("session/guest");

  const button = isGuest
    ? (
      <MenuItem onClick={() => { setAnchorEl(null); return lrs.actions.solid.login(); }}>
        Sign in
      </MenuItem>
    )
    : (
      <MenuItem onClick={() => { setAnchorEl(null); return lrs.actions.solid.logout(); }}>
        Sign out
      </MenuItem>
    );

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Icon>
          {image
            ? <LinkedResourceContainer subject={image} onError={AccountCircle} />
            : <AccountCircle />}
        </Icon>
      </IconButton>
      <Menu
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          component={NavLink}
          to={isGuest ? undefined : "/settings"}
        >
          {name.value}
        </MenuItem>
        {button}
      </Menu>
    </React.Fragment>
  );
};

SessionLeftPanel.type = [
  solidActions.ns("Session"),
  schema.Person,
  foaf.Person,
];

SessionLeftPanel.topology = solidActions.ns("session/topology");

SessionLeftPanel.mapDataToProps = {
  image: ImageProps,
  name: NameProps,
};
