import { useLinkRenderContext } from "link-redux";
import * as React from "react";

import { LDLink } from "../../components/LDLink";
import { ThingTypes } from "../../helpers/types";
import { DataGridCellListItemTopology } from "../../topologies";

export const ThingDataGridCellListItem = () => {
    const { subject } = useLinkRenderContext();

    return (
      <LDLink>
          {subject.toString()}
      </LDLink>
    );
};

ThingDataGridCellListItem.type = ThingTypes;

ThingDataGridCellListItem.topology = DataGridCellListItemTopology;
