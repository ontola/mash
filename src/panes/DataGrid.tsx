import "../rdfLibFactory";

import { NamedNode } from "@ontologies/core";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";
import { DataGrid } from "../topologies/DataGrid/DataGrid";

import base from "./base";

export default {
  ...base,

  name: "Data Grid",

  children(subject: NamedNode) {
    return (
      <DataGrid>
        <LinkedResourceContainer subject={subject} />
      </DataGrid>
    );
  },
};
