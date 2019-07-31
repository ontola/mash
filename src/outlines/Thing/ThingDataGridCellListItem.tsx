import { useLinkRenderContext } from "link-redux";
import * as React from "react";

import { DataGridCellListItemTopology } from "../../canvasses";
import { LDLink } from "../../components/LDLink";
import { ThingTypes } from "../../helpers/types";

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
