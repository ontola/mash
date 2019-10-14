import { Typography } from "@material-ui/core";
import rdf from "@ontologies/rdf";
import * as React from "react";

import { PersonTypes } from "../../helpers/types";
import dbp from "../../ontology/dbp";
import { ArticleTopology } from "../../topologies";

export const QuoteArticle = ({ label, prop }) => (
  <React.Fragment>
      <Typography variant="h3">{label.term}</Typography>
      {prop
        .filter((s) => s.datatype.value === rdf.langString.value)
        .map((s) => <Typography key={s.value} variant="caption">{s.value}</Typography>)}
  </React.Fragment>
);

QuoteArticle.type = PersonTypes;

QuoteArticle.property = dbp.ns("quote");

QuoteArticle.topology = ArticleTopology;

QuoteArticle.mapDataToProps = {
    prop: {
        label: dbp.ns("quote"),
        limit: Infinity,
    },
};
