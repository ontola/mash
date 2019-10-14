import { Button } from "@material-ui/core";
import * as React from "react";

import ll from "../../ontology/ll";
import {
  allTopologiesExcept,
  ArticleTableCellTopology,
  ArticleTopology,
  InfoListItemTopology,
  InfoListTopology,
} from "../../topologies";

export const ErrorResource = ({ reset }) => (
  <Button
    variant="contained"
    onClick={reset}
  >
    Error
  </Button>
);

ErrorResource.type = ll.ErrorResource;

ErrorResource.topology = allTopologiesExcept(
  ArticleTopology,
  InfoListTopology,
  ArticleTableCellTopology,
  InfoListItemTopology,
);
