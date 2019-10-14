import rdfFactrory from "@ontologies/core";
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
  rdfFactrory.namedNode("http://www.w3.org/ns/iana/media-types/image/jpeg#Resource"),
  rdfFactrory.namedNode("http://www.w3.org/ns/iana/media-types/image/png#Resource"),
];

Image.topology = allTopologiesExcept(
  DialogTopology,
  IconTopology,
);
