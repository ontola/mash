import { ListItem, ListItemText } from "@material-ui/core";
import { Property } from "link-redux";
import * as React from "react";

import { LDLink } from "../../components/LDLink";
import { retrieveFilename } from "../../helpers/iris";
import { NameProps, ThingTypes } from "../../helpers/types";
import { ListTopology } from "../../topologies/List/List";

export const ThingList = ({ folder, subject }) => (
  <ListItem>
    <LDLink>
      <ListItemText>
        <Property forceRender label={NameProps}>
          {([ name ]) => (
            (name && name.value) || retrieveFilename(subject, folder)
          )}
        </Property>
      </ListItemText>
    </LDLink>
  </ListItem>
);

ThingList.type = ThingTypes;

ThingList.topology = ListTopology;
