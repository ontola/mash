import "../rdfLibFactory";

import { NamedNode } from "@ontologies/core";
import importToArray from "import-to-array";
import * as LinkLib from "link-lib";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";
import * as outlines from "../outlines";

import { DataGrid } from "../topologies/DataGrid/DataGrid";
import * as views from "../views";

import base from "./base";

const renderers = [
  ...importToArray<string, React.ElementType<any>>(outlines),
  ...importToArray<string, React.ElementType<any> | LinkLib.ComponentRegistration<React.ElementType<any>>>(views),
];

export default {
  ...base,

  name: "Data Grid",

  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAADxJREFUSMdjYBgFwx4woguUlpb+R+Z3d3czoosRAt3d3XBzmWjtg6FvAc3BaCQPvAU0B6ORPPAWjIIRAADcjxgW746CQAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0xMC0zMFQwOToxMTowMiswMDowMNyp0vIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMTAtMzBUMDk6MTE6MDIrMDA6MDCt9GpOAAAAKHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy90bXAvbWFnaWNrLTVtN1o4VUZmON+HNwAAAABJRU5ErkJggg==",

  views: renderers,

  children(subject: NamedNode) {
    return (
      <DataGrid>
        <LinkedResourceContainer
          editable={false}
          subject={subject}
        />
      </DataGrid>
    );
  },
};
