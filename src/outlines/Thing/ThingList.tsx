import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon as MaterialIcon,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import { PopperProps } from "@material-ui/core/Popper";
import { LinkedResourceContainer, Property, useLRS } from "link-redux";
import * as React from "react";
import { withRouter } from "react-router";

import { LDLink } from "../../components/LDLink";
import { parentDir, resourceToWikiPath, retrieveFilename } from "../../helpers/iris";
import { NameProps, ThingTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { Icon } from "../../topologies/Icon";
import { ListTopology } from "../../topologies/List/List";
import { Dialog } from "../../topologies/Ontola/Dialog";

const bestType = (types) => {
  if (types.includes(NS.ldp("Container"))) {
    return NS.ldp("Container");
  }

  return undefined;
};

export const ThingList = ({
  folder,
  history,
  name,
  subject,
  types,
}) => {
  const lrs = useLRS();
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ showDialog, setShowDialog ] = React.useState(false);
  const type = bestType(types);

  const PopperMenu = Menu as React.ComponentType<MenuProps & PopperProps>;

  const closeDialog = () => {
    setAnchorEl(null);
    setShowDialog(false);
  };
  const deleteResource = () => (lrs.actions.solid.deleteFile(subject) as Promise<void>)
    .then(closeDialog)
    .then(() => (lrs as any).store.removeStatements((lrs as any).store.match(null, null, subject, folder)))
    .then(() => {
      if (folder === subject) {
        history.push(resourceToWikiPath(parentDir(subject)));
      }
    });

  return (
    <React.Fragment>
      <ListItem button component={LDLink}>
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
          onClick={() => setShowDialog(true)}
        >
          <ListItemIcon>
            <Icon>delete</Icon>
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </ListItem>
      </PopperMenu>
      <Dialog
        open={showDialog}
        onClose={closeDialog}
      >
        <DialogTitle>
          <Typography variant="h5">Delete resource</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to permanently delete {subject.value}? This operation cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Dismiss
          </Button>
          <Button
            color="primary"
            onClick={deleteResource}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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

ThingList.hocs = [withRouter];
