import { ListItem, ListItemText } from "@material-ui/core";
import { Property } from "link-redux";
import * as React from "react";

import { LDLink } from "../../components/LDLink";
import { retrieveFilename } from "../../helpers/iris";
import { NameProps } from "../../helpers/types";
import { NS } from "../../LRS";
import { ListTopology } from "../../topologies/List/List";

export const LDPResourceList = ({ folder, subject }) => (
  <ListItem component={LDLink}>
    <ListItemText
      primary={(
        <Property forceRender label={NameProps}>
          {([ name ]) => name || retrieveFilename(subject, folder)}
        </Property>
      )}
      secondary={(
        <Property label={NS.dc("modified")} />
      )}
    />
  </ListItem>
);

LDPResourceList.type = NS.ldp("Resource");

LDPResourceList.topology = ListTopology;
