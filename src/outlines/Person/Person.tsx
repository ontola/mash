import { Grid, makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { LinkedResourceContainer, Property } from "link-redux";
import * as React from "react";

import {
  NameProps,
  PersonTypes,
} from "../../helpers/types";
import app from "../../ontology/app";
import vcard from "../../ontology/vcard";
import { Card } from "../../topologies/Card/Card";
import main from "../../topologies/main";

const useStyles = makeStyles({
  header: {
    alignItems: "center",
    display: "flex",
  },
  subtitle: {
    marginLeft: ".8em",
  },
});

export const Person = () => {
  const classes = useStyles({});

  const PropsInCard = ({ children = null, label }) => (
    <Grid item>
      <LinkedResourceContainer subject={label} />
      <Property label={label} limit={Infinity}>
        {(values) => values.map((p) => (
          <Grid container direction="column" spacing={2} xs={12} sm={8} lg={7} xl={6}>
            <Grid item key={p.value}>
              <Card>
                <LinkedResourceContainer children={children} subject={p} />
              </Card>
            </Grid>
          </Grid>
        ))}
      </Property>
    </Grid>
  );

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <div className={classes.header}>
            <Property forceRender label={app.ns("avatar")} />
            <div>
              <Property label={[vcard.ns("fn"), ...NameProps]} />
              <Property
                forceRender
                className={classes.subtitle}
                label={app.ns("orgInfo")}
              />
            </div>
          </div>
        </Grid>
        <PropsInCard label={vcard.hasAddress} />
        <PropsInCard label={vcard.hasEmail} />
        <PropsInCard label={vcard.hasTelephone} />
      </Grid>
    </Container>
  );
};

Person.type = PersonTypes;

Person.topology = main;
