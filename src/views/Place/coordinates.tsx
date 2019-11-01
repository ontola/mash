import { TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { MapView } from "../../components/MapView";

import { PlaceTypes } from "../../helpers/types";
import app from "../../ontology/app";
import { InfoListSectionTopology } from "../../topologies";

export const CoordinatesInfoList = ({
  latd,
  latm,
  latns,
  longd,
  longew,
  longm,
}) => (
  <TableRow>
    <TableCell colSpan={3}>
      <MapView
        showCoordinates
        latd={latd}
        latm={latm}
        latns={latns}
        longd={longd}
        longew={longew}
        longm={longm}
      />
    </TableCell>
  </TableRow>
);

CoordinatesInfoList.type = PlaceTypes;

CoordinatesInfoList.property = app.ns("coordinates");

CoordinatesInfoList.topology = InfoListSectionTopology;

CoordinatesInfoList.linkOpts = {
  returnType: "value",
};
