import { TableCell, TableRow } from "@material-ui/core";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { Literal } from "rdflib";
import * as React from "react";

import { InfoListSectionTopology } from "../../topologies";
// import InfoListItemText from "../../components/InfoListItemText";
import { PlaceTypes } from "../../helpers/types";
import { NS } from "../../LRS";

interface PropTypes {
  latd: Literal;
  latm: Literal;
  latns: Literal;
  longd: Literal;
  longew: Literal;
  longm: Literal;
}

export class CoordinatesInfoList extends React.PureComponent<PropTypes> {
  public static type = PlaceTypes;

  public static property = NS.app("coordinates");

  public static topology = InfoListSectionTopology;

  public static mapDataToProps = [
    NS.dbp("latd"),
    NS.dbp("latm"),
    NS.dbp("latns"),
    NS.dbp("longd"),
    NS.dbp("longew"),
    NS.dbp("longm"),
  ];

  public static linkOpts = {
    returnType: "value",
  };

  private map: Map;
  private mapRef: any;

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.createMap = this.createMap.bind(this);
  }

  public componentDidMount() {
    this.createMap();
  }

  public componentDidUpdate() {
    this.createMap();
  }

  public render() {
    const { latd, latm, latns, longd, longew, longm } = this.props;

    if (!(latd && latm && longd && longm)) {
      return null;
    }

    return (
      <TableRow>
        <TableCell colSpan={3}>
          <div ref={this.mapRef} />
          <span style={{ display: "block", textAlign: "center" }}>
            {`${latd}°${latm}′${latns} ${longd}°${longm}′${longew}`}
          </span>
        </TableCell>
      </TableRow>
    );
  }

  private createMap() {
    const { current } = this.mapRef;

    const { latd, latm, longd, longm } = this.props;

    if (!(current && latd && latm && longd && longm) || this.map) {
      return null;
    }

    const center = fromLonLat([
      Number(`${longd}.${longm}`),
      Number(`${latd}.${latm}`),
    ]);

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      target: current,
      view: new View({
        center,
        zoom: 6,
      }),
    });
  }
}
