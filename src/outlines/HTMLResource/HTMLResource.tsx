import { Icon, Link } from "@material-ui/core";
import { useLinkRenderContext } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import {
  allTopologiesExcept,
  DialogTopology,
  IconTopology,
} from "../../topologies";

export const HTMLResource = ({ subject }) => {
  const { subject: subjectCtx } = useLinkRenderContext();

  return (
    <Link
     href={(subject || subjectCtx).value}
     rel="noopener noreferrer"
     target="_blank"
    >
      <Icon>open_in_new</Icon>
      {(subject || subjectCtx).value}
    </Link>
  );
};

HTMLResource.type = [
  new NamedNode("http://www.w3.org/ns/iana/media-types/text/html#Resource"),
];

HTMLResource.topology = allTopologiesExcept(
  DialogTopology,
  IconTopology,
);
