import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/styles";
import { LinkedResourceContainer, useLRS } from "link-redux";
import * as React from "react";
import { Breadcrumbs } from "../../components/Breadcrumbs";

import { NS } from "../../LRS";
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

export const Container = ({ contains, subject }) => {
  const lrs = useLRS();
  const classes = useStyles({});
  const [showDialog, setShowDialog] = React.useState(false);
  const [filename, setFilename] = React.useState("");

  const closeDialog = () => {
    setShowDialog(false);
    setFilename("");
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
      <Fab
        className={classes.fab}
        color="primary"
        onClick={() => setShowDialog(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={showDialog}
        onClose={closeDialog}
      >
        <DialogTitle>
          <Typography variant="h5">Create file</Typography>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Dismiss
          </Button>
          <Button
            color="primary"
            onClick={() => (lrs.actions.solid.createFile(subject, filename) as Promise<void>).then(closeDialog)}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

Container.type = NS.ldp("Container");

Container.topology = allTopologiesExcept(DataGridTopology);

Container.mapDataToProps = {
  contains: {
    label: NS.ldp("contains"),
    limit: Infinity,
  },
};
