import "../rdfLibFactory";

import { NamedNode } from "@ontologies/core";
import { LinkedResourceContainer, register } from "link-redux";
import * as React from "react";
import ldp from "../ontology/ldp";

import { Container } from "../outlines/LDP";

import base from "./base";

export default {
  ...base,

  name: "Directory",

  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAIFJREFUSMftkLENgDAMBN9ZA5iIPTJBkhZoI6WHSRgI5nCoQCBAAsmIxle5sP70Dyh/Q+vhnKuJaABQXD4SdTHG9q3A7AL6u3AAyDk3IYTXgq2B9z4LrTIzs00pjYcGgpTGmOE0kTDV14INFahABUfBLJg7nQTMbIUkEwD79TLKcxZtshxfj9e2gAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0xMC0zMVQxNTozNjoxNSswMDowMMbJh0YAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMTAtMzFUMTU6MzY6MTUrMDA6MDC3lD/6AAAAKHRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy90bXAvbWFnaWNrLWs5cGRkYmdkYcuglAAAAABJRU5ErkJggg==",

  types: [
    ldp.ns("Container"),
    ldp.ns("BasicContainer"),
    ldp.ns("DirectContainer"),
    ldp.ns("IndirectContainer"),
  ],

  children(subject: NamedNode) {
    const WrappedContainer = register(Container as any)[0].component;

    return (
      <LinkedResourceContainer subject={subject}>
        <WrappedContainer />
      </LinkedResourceContainer>
    );
  },
};
