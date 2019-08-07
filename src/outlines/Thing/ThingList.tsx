import {
  Icon as MaterialIcon,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { PopperProps } from "@material-ui/core/Popper";
import { LinkedResourceContainer, Property } from "link-redux";
import * as React from "react";

import { LDLink } from "../../components/LDLink";
import { retrieveFilename } from "../../helpers/iris";
import { NameProps, ThingTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { Icon } from "../../topologies/Icon";
import { ListTopology } from "../../topologies/List/List";

const bestType = (types) => {
  if (types.includes(NS.ldp("Container"))) {
    return NS.ldp("Container");
  }

  return undefined;
};

export const ThingList = ({
  folder,
  name,
  subject,
  types,
}) => {
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const type = bestType(types);

  const PopperMenu = Menu as React.ComponentType<MenuProps & PopperProps>;

  return (
    <React.Fragment>
      <ListItem component={LDLink}>
        {type && (
          <ListItemIcon>
            <Icon>
              <LinkedResourceContainer subject={type} />
            </Icon>
          </ListItemIcon>
        )}
        <ListItemText
          inset={!type}
          secondary={(
            <Property label={NS.dc("modified")} />
          )}
        >
          {(name && name.value) || retrieveFilename(subject, folder)}
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MaterialIcon>more_vert</MaterialIcon>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <PopperMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        placement="bottom-end"
        onClose={() => setAnchorEl(null)}
      >
        <ListItem
          button
          component={LDLink}
          to={undefined}
          onClick={close}
        >
          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </ListItem>
      </PopperMenu>
    </React.Fragment>
  );
};

ThingList.type = ThingTypes;

ThingList.topology = ListTopology;

ThingList.mapDataToProps = {
  name: NameProps,
  types: {
    label: NS.rdf("type"),
    limit: Infinity,
  },
};
