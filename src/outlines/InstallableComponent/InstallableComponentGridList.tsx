import {
  GridListTile,
  GridListTileBar,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import schema from "@ontologies/schema";
import { useLRS } from "link-redux";
import * as React from "react";
import { generatePackageInfoUrl, installComponent } from "../../helpers/installableComponents";
import { ImageProps, NameProps } from "../../helpers/types";

import ll from "../../ontology/ll";
import { GridListTopology } from "../../topologies";

const useStyles = makeStyles({
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  root: {
    minHeight: "7em",
    minWidth: "25em",
  },
});

export const InstallableComponentGridList = ({ image, name, subject }) => {
  const classes = useStyles({});
  const lrs = useLRS();
  const installed = (lrs as any).installedModules.includes(subject.value);

  return (
    <GridListTile
      className={classes.root}
      key={image.value}
    >
      <img src={image.value} alt={name.value} />
      <GridListTileBar
        title={name.value}
        subtitle={generatePackageInfoUrl(lrs, subject)}
        actionIcon={
          <Switch
            checked={installed}
            onChange={(e) => {
              if (e.target.checked) {
                installComponent(lrs, subject);
              } else {
                lrs.actions.ontola.showSnackbar("Refresh the page to disable extensions");
              }
            }}
            value={installed ? "Installed" : "Not installed"}
            inputProps={{ "aria-label": "Install extension" }}
          />
        }
      />
    </GridListTile>
  );
};

InstallableComponentGridList.type = ll.ns("InstallableComponent");

InstallableComponentGridList.topology = GridListTopology;

InstallableComponentGridList.mapDataToProps = {
  image: [schema.logo, ...ImageProps],
  name: NameProps,
};
