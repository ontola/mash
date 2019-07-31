import { Typography } from "@material-ui/core";
import * as React from "react";

import { ArticleTopology } from "../../canvasses";
import { PersonTypes } from "../../helpers/types";
import { NS } from "../../LRS";

export const QuoteArticle = ({ label, prop }) => (
  <React.Fragment>
      <Typography variant="h3">{label.term}</Typography>
      {prop
        .filter((s) => s.datatype.value === NS.rdf("langString").value)
        .map((s) => <Typography key={s.value} variant="caption">{s.value}</Typography>)}
  </React.Fragment>
);

QuoteArticle.type = PersonTypes;

QuoteArticle.property = NS.dbp("quote");

QuoteArticle.topology = ArticleTopology;

QuoteArticle.mapDataToProps = {
    prop: {
        label: NS.dbp("quote"),
        limit: Infinity,
    },
};
