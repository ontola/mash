import { Menu, MenuItem } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle } from "@material-ui/icons";
import { LinkedResourceContainer, useLRS } from "link-redux";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { ImageProps, NameProps } from "../../helpers/types";
import { NS } from "../../LRS";
import { Icon } from "../../topologies/Icon";

export const SessionLeftPanel = ({ image, name, subject }) => {
  const lrs = useLRS();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isGuest = subject === NS.solid("session/guest");

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
  NS.solid("Session"),
  NS.schema("Person"),
  NS.foaf("Person"),
];

SessionLeftPanel.topology = NS.solid("session/topology");

SessionLeftPanel.mapDataToProps = {
  image: ImageProps,
  name: NameProps,
};
