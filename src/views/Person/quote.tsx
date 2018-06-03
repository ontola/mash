import LinkedRenderStore from "link-lib";
import { link } from "link-redux";
import { Typography } from "material-ui";
import * as React from "react";

import { PersonTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { ArticleTopology } from "../../canvasses";

const Quote = ({ label, prop }) => (
    <React.Fragment>
        <Typography variant="display1">{label.term}</Typography>
        {prop
            .filter((s) => s.datatype.value === NS.rdf("langString").value)
            .map((s) => <Typography key={s.value} variant="caption">{s.value}</Typography>)}
    </React.Fragment>
);

export default LinkedRenderStore.registerRenderer(
  link({
      prop: {
          label: NS.dbp("quote"),
          limit: Infinity,
      },
  })(Quote),
  PersonTypes,
  NS.dbp("quote"),
  ArticleTopology,
);
