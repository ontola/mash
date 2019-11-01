import { Collapse, Grid, Grow, Tooltip } from "@material-ui/core";
import { Edit as EditIcon, Save as SaveIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import rdfFactory from "@ontologies/core";
import rdfs from "@ontologies/rdfs";
import { rdflib } from "link-lib";
import { useLRS } from "link-redux";
import * as React from "react";

import { ResourceInput } from "../components/ResourceInput";
import SubResourceTable from "../components/SubResourceTable";
import { groupBy } from "../helpers/data";
import { PersonTypes, ThingTypes } from "../helpers/types";
import { DataGridTopology } from "../topologies";

const useStyles = makeStyles({
  editIcon: {
    cursor: "pointer",
    float: "right",
  },
  input: {
    width: "100%",
  },
  table: {
    margin: "1.5em 0 1em",
  },
});

export const ResourceDataGrid = ({ subject: resource, editable = true }) => {
  const lrs = useLRS();
  const classes = useStyles({});
  const [ editing, setEditing ] = React.useState(false);

  if (!resource) {
    return <p>No resource selected</p>;
  }

  const graphData = lrs
    .tryEntity(resource)
    .concat((lrs as any).store.match(
      null,
      null,
      null,
      rdfFactory.namedNode(rdflib.URI.docpart(resource.value)),
    ));
  const groups = groupBy(graphData, (s) => s.subject);

  const tableForSubject = ([ subject, statements ]) => (
    <SubResourceTable
      editable={editable}
      editing={editing}
      graph={resource}
      subject={subject}
      statements={statements}
    />
  );

  return (
    <Grid container spacing={2} lg={9} xl={8}>
      {editable && (
        <Grid item xs={12}>
          <Tooltip title="Edit graph">
            <EditIcon className={classes.editIcon} onClick={() => setEditing(!editing)} />
          </Tooltip>
          <Grow in={editing}>
            <Tooltip title="Save graph">
              <SaveIcon
                className={classes.editIcon}
                onClick={() => lrs.actions.solid.save(resource)}
              />
            </Tooltip>
          </Grow>
        </Grid>
      )}
      {Array.from(groups, tableForSubject)}
      <Collapse in={editing}>
        <Grid item xs={12}>
          <ResourceInput
            className={classes.input}
            graph={resource}
          />
        </Grid>
      </Collapse>
    </Grid>
  );
};

ResourceDataGrid.type = [
  rdfs.Resource,
  ...PersonTypes,
  ...ThingTypes,
];

ResourceDataGrid.topology = DataGridTopology;
