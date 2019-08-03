import * as React from "react";

import { NS } from "../../LRS";
import { allTopologies } from "../../topologies";

export const ImageObject = ({ contentUrl, subject, ...rest }) => (
  <img
    src={contentUrl.value}
    {...rest}
  />
);

ImageObject.type = NS.schema("ImageObject");

ImageObject.topology = allTopologies;

ImageObject.mapDataToProps = {
  contentUrl: NS.schema("contentUrl"),
};
