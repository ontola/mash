import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import { Property } from "link-redux";
import * as React from "react";

export const Bag = () => (
  <Property
    label={rdfs.member}
    limit={Infinity}
  />
);

Bag.type = rdf.Bag;
