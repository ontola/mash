import { Property } from "link-redux";
import * as React from "react";

import { ImageProps } from "../../helpers/types";
import { NS } from "../../LRS";
import { IconTopology } from "../../topologies";

export const RDFSClassIcon = () => (
  <Property
    label={ImageProps}
    limit={Infinity}
  />
);

RDFSClassIcon.type = NS.rdfs("Class");

RDFSClassIcon.topology = IconTopology;
