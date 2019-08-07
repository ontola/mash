import { NamedNode } from "rdflib";
import * as React from "react";

import {
  allTopologiesExcept,
  DialogTopology,
  IconTopology,
} from "../../topologies";

export const Image = ({ subject, ...rest }) => (
  <img src={subject.value} {...rest} />
);

Image.type = [
  new NamedNode("http://www.w3.org/ns/iana/media-types/image/jpeg#Resource"),
  new NamedNode("http://www.w3.org/ns/iana/media-types/image/png#Resource"),
];

Image.topology = allTopologiesExcept(
  DialogTopology,
  IconTopology,
);
