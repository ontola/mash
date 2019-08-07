import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";
import { allTopologiesExcept, DataGridTopology } from "../../topologies";
import { List } from "../../topologies/List/List";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: "20em",
    width: "100%",
  },
}));

export const Container = ({ contains, subject }) => {
  const classes = useStyles({});

  return (
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
