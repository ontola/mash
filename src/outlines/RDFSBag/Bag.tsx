import { Property } from "link-redux";
import * as React from "react";

import { NS } from "../../LRS";

export const Bag = () => (
  <Property
    label={NS.rdfs("member")}
    limit={Infinity}
  />
);

Bag.type = NS.rdfs("Bag");
