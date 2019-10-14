import rdfs from "@ontologies/rdfs";
import { Property } from "link-redux";
import * as React from "react";

import { ImageProps, NameProps } from "../../helpers/types";
import { allTopologiesExcept, IconTopology } from "../../topologies";
import { Chip } from "../../topologies/Chip";

export const RDFSClass = () => (
  <Chip
    avatar={<Property label={ImageProps} />}
    label={<Property label={NameProps} />}
  />
);

RDFSClass.type = rdfs.Class;

RDFSClass.topology = allTopologiesExcept(IconTopology);
