import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  TextField,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FolderIcon from "@material-ui/icons/Folder";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { makeStyles } from "@material-ui/styles";
import rdfFactory from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { SomeNode } from "link-lib";
import { LinkedResourceContainer, Property, useLRS } from "link-redux";
import * as React from "react";
import { withRouter } from "react-router";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { resourceToWikiPath } from "../../helpers/iris";
import { ImageProps, NameProps } from "../../helpers/types";
import ldp from "../../ontology/ldp"

import ll from "../../ontology/ll";
import { allTopologiesExcept, DataGridTopology } from "../../topologies";
import { List } from "../../topologies/List/List";
import { Dialog } from "../../topologies/Ontola/Dialog";

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    bottom: "2em",
    position: "fixed",
    right: "2em",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Container = ({ contains, history, subject }) => {
  const lrs = useLRS();
  const classes = useStyles({});
  const [showDialog, setShowDialog] = React.useState<string | null>(null);
  const [fileFormat, setFileFormat] = React.useState<SomeNode | null>(null);
  const [filename, setFilename] = React.useState("");

  const closeDialog = () => {
    setShowDialog(null);
    setFileFormat(null);
    setFilename("");
  };

  const fileFormats = (lrs as any)
    .store
    .match(null, rdf.type, ll.ns("CreatableFileFormat"), null)
    .map((s) => s.subject);

  const actions = {
    createFile: {
      action: () => {
        const template = fileFormat && lrs.getResourceProperty(fileFormat, ll.ns("fileTemplate")) as SomeNode;

        return (lrs.actions.solid.createFile(subject, filename, template || null) as Promise<void>)
          .then(closeDialog);
      },
      icon: <NoteAddIcon />,
      title: "Create File",
    },
    createFolder: {
      action: () => (lrs.actions.solid.createFolder(subject, filename) as Promise<void>)
        .then(closeDialog),
      icon: <FolderIcon />,
      title: "Create Folder",
    },
  };

  const createResource = () => actions[showDialog].action()
    .then(closeDialog);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    if (open) {
      setShowDialog("createFile");
    }
    setOpen((prevOpen) => !prevOpen);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Breadcrumbs />
      <List className={classes.root}>
        {contains.map((member) => (
          <LinkedResourceContainer
            fetch
            key={member.value}
            subject={member}
            folder={subject}
          />
        ))}
      </List>
      <SpeedDial
        ariaLabel="Create menu"
        className={classes.fab}
        icon={(
          <SpeedDialIcon
            icon={<AddIcon />}
            openIcon={<NoteAddIcon />}
          />
        )}
        onBlur={handleClose}
        onClick={handleClick}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={open}
      >
        <SpeedDialAction
          icon={actions.createFolder.icon}
          tooltipTitle="Create folder"
          onClick={() => setShowDialog("createFolder")}
        />
        {fileFormats.map((format) => {
          const tooltipTitle = lrs.getResourceProperty(format, ll.ns("newLabel"));

          return (
              <SpeedDialAction
                icon={(
                  <LinkedResourceContainer subject={format}>
                    <Property label={ImageProps} />
                  </LinkedResourceContainer>
                )}
                tooltipTitle={tooltipTitle ? tooltipTitle.value : undefined}
                onClick={() => {
                  setShowDialog("createFile");
                  setFileFormat(format);
                }}
              />
          );
        })}
        <SpeedDialAction
          icon={<Icon>extension</Icon>}
          title="Go to extensions for more!"
          onClick={() => history.push(resourceToWikiPath(rdfFactory.namedNode("about:extensions")))}
          tooltipTitle="Go to extensions for more!"
        />
      </SpeedDial>
      <Dialog
        open={!!showDialog}
        onClose={closeDialog}
      >
        {!!showDialog && (
          <React.Fragment>
            <DialogTitle>
              {!fileFormat
                ? actions[showDialog].title
                : (
                  <LinkedResourceContainer subject={fileFormat}>
                    <Property label={NameProps} />
                  </LinkedResourceContainer>
                )}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                id="filename"
                label="Filename"
                margin="dense"
                type="text"
                value={filename}
                variant="outlined"
                onChange={(e) => setFilename(e.target.value)}
                onKeyUp={(e) => {
                  if (e.keyCode === 27) {
                    closeDialog();
                  } else if (e.keyCode === 13) {
                    createResource();
                  }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog}>
                Dismiss
              </Button>
              <Button
                color="primary"
                onClick={createResource}
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
};

Container.type = ldp.ns("Container");

Container.topology = allTopologiesExcept(DataGridTopology);

Container.hocs = [withRouter];

Container.mapDataToProps = {
  contains: {
    label: ldp.ns("contains"),
    limit: Infinity,
  },
};
