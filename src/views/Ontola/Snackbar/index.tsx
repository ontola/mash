import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import schema from "@ontologies/schema";
import { LinkReturnType } from "link-redux";
import * as React from "react";

import ontola from "../../../ontology/ontola";
import { allTopologies } from "../../../topologies";

const SNACKBAR_TIMEOUT = 2750;

export const SnackbarView = ({ close, text }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      action={[
        <IconButton
          aria-label="Close"
          color="inherit"
          href="#"
          key="close"
          title="Sluiten"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      autoHideDuration={SNACKBAR_TIMEOUT}
      message={text}
      open={open}
      onClose={handleClose}
      onExited={close}
    />
  );
};

SnackbarView.type = ontola.ns("snackbar/Snackbar");

SnackbarView.topology = allTopologies;

SnackbarView.mapDataToProps = {
  text: schema.text,
};

SnackbarView.linkOpts = { returnType: "value" as LinkReturnType };
