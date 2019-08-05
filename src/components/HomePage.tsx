import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import * as React from "react";

import { LDLink } from "./LDLink";

export const HomePage = () => (
  <Grid container justify="center" spacing={10}>
    <Grid item xs={12} sm={9} md={6} lg={6}>
      <Typography color="textPrimary" variant="h1">Welcome</Typography>
      <Typography>
        Mash is a browser to display data from your pod, <LDLink to="http://dbpedia.org/resource/DBpedia">DBpedia</LDLink>
        and the web.<br/><br/>
      </Typography>
      <Typography color="textPrimary" variant="h2">Usage</Typography>
      <Typography>
        Just start typing in the search bar at the top of the page (not the browser bar!) and select
        a resource to view. DBPedia resources work best, though some wikidata views might also work.
      </Typography>
      <Typography>
        Note that, either due to bugs in this browser and some implementation details in DBPedia
        some pages will only give a proper render after reload, so hitting that button when a lot of
        resources seem to give an error might resolve the situation. If not, the needed views
        probably aren't written yet.
      </Typography>
      <Typography color="textPrimary" variant="h2">Example pages</Typography>
      <Typography>
        <LDLink to="http://dbpedia.org/resource/Douglas_Engelbart">Douglas Engelbart</LDLink><br/>
        <LDLink to="http://dbpedia.org/resource/Johan_Cruyff">Johan Cruyff</LDLink><br/>
        <LDLink to="http://dbpedia.org/resource/Amsterdam">Amsterdam</LDLink><br/>
      </Typography>
    </Grid>
  </Grid>
);
