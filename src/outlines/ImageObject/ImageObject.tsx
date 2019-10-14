import schema from "@ontologies/schema";
import * as React from "react";

import { allTopologies } from "../../topologies";

export const ImageObject = ({ contentUrl, subject, ...rest }) => (
  <img
    src={contentUrl.value}
    {...rest}
  />
);

ImageObject.type = schema.ImageObject;

ImageObject.topology = allTopologies;

ImageObject.mapDataToProps = {
  contentUrl: schema.contentUrl,
};
