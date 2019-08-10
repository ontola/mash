import { Property } from "link-redux";
import * as React from "react";

import { ImageProps, NameProps } from "../../helpers/types";
import { NS } from "../../LRS";
import { allTopologiesExcept, IconTopology } from "../../topologies";
import { Chip } from "../../topologies/Chip";

export const RDFSClass = () => (
  <Chip
    avatar={<Property label={ImageProps} />}
    label={<Property label={NameProps} />}
  />
);

RDFSClass.type = NS.rdfs("Class");

RDFSClass.topology = allTopologiesExcept(IconTopology);
