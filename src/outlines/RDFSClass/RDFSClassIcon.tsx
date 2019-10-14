import rdfs from "@ontologies/rdfs";
import { Property } from "link-redux";
import * as React from "react";

import { ImageProps } from "../../helpers/types";
import { IconTopology } from "../../topologies";

export const RDFSClassIcon = () => (
  <Property
    label={ImageProps}
    limit={Infinity}
  />
);

RDFSClassIcon.type = rdfs.Class;

RDFSClassIcon.topology = IconTopology;
