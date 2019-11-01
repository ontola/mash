import { CardContent, CardHeader } from "@material-ui/core";
import { Property } from "link-redux";
import * as React from "react";
import { LDLink } from "../../components/LDLink";

import {
  DescriptionProps,
  NameProps,
  TextProps,
  ThingTypes,
} from "../../helpers/types";
import { CardTopology } from "../../topologies";

export const ThingCard = () => {
  return (
    <LDLink>
      <CardHeader>
        <Property label={NameProps} />
      </CardHeader>
      <CardContent>
        <Property label={[...DescriptionProps, ...TextProps]} />
      </CardContent>
    </LDLink>
  );
};

ThingCard.type = ThingTypes;

ThingCard.topology = CardTopology;
