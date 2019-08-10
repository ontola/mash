import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slide,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Property, useLRS } from "link-redux";
import * as React from "react";
import { generatePackageDownloadUrl, installComponent } from "../helpers/installableComponents";

import { NS } from "../LRS";

const useSyles = makeStyles((theme: Theme) => ({
  paper: {
    margin: theme.spacing(1),
    position: "relative",
    zIndex: 1,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  root: {
    height: 180,
  },
  svg: {
    height: 100,
    width: 100,
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
}));

export const InstallableComponentChecker = () => {
  const classes = useSyles({});
  const lrs = useLRS();
  const [ asked, setAsked ] = React.useState([]);
  const [ current, setCurrent ] = React.useState(null);

  return (
    <React.Fragment>
      <Property label={NS.rdf("type")}>
        {(types) => {
          for (const type of types) {
            if (!(lrs as any).installedModules.includes(type.value) &&
              !asked.includes(type) &&
              lrs.getResourceProperties(type, NS.rdf("type")).includes(NS.ll("InstallableComponent"))) {

              setCurrent(type);
              break;
            }
          }
        }}
      </Property>
      <Slide direction="up" in={current} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.paper}>
          <DialogTitle>
            Component available
          </DialogTitle>
          {current && (
            <React.Fragment>
              <DialogContent>
                <DialogContentText>
                  Install module for {current.value}? Be sure to trust the source before you continue
                </DialogContentText>
                <DialogContentText>
                  Package source: "{generatePackageDownloadUrl(lrs, current)}"
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setAsked([...asked, current]);
                    setCurrent(null);
                  }}
                >
                  Dismiss
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setAsked([...asked, current]);
                    installComponent(lrs, current);
                    setCurrent(null);
                  }}
                  variant="contained"
                >
                  Install
                </Button>
              </DialogActions>
            </React.Fragment>
          )}
        </Paper>
      </Slide>
    </React.Fragment>
  );
};
