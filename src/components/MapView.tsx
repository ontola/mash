import { Map, View } from "ol";
import Collection from "ol/Collection";
import Control from "ol/control/Control";
import { Coordinate } from "ol/coordinate";
import { Extent } from "ol/extent";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import { Point } from "ol/geom";
import { Layer } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import * as React from "react";

interface PropTypes {
  controls?: Collection<Control> | Control[];
  extent?: Extent;
  geoJSON?: string;
  lat?: string | number;
  lon?: string | number;
  latd?: string | number;
  latm?: string | number;
  latns?: string | number;
  longd?: string | number;
  longew?: string | number;
  longm?: string | number;
  showCoordinates?: boolean;
  zoom?: number;
}

export class MapView extends React.PureComponent<PropTypes> {
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
    const coordinates = this.coordinates();

    if (!coordinates) {
      return null;
    }

    const [ latd, latm, latns, longd, longm, longew ] = toLonLat(coordinates);

    return (
      <div>
        <div style={{ display: "inline-grid", height: "12em", width: "100%" }} ref={this.mapRef} />
        {this.props.showCoordinates && (
          <span style={{ display: "block", textAlign: "center" }}>
              {`${latd}°${latm}′${latns} ${longd}°${longm}′${longew}`}
          </span>
        )}
      </div>
    );
  }

  private coordinates(): Coordinate {
    const { lat, lon, latd, latm, longd, longm } = this.props;

    if (lat && lon) {
      return [Number(lon), Number(lat)];
    }

    if (latd && latm && longd && longm) {
      return [
        Number(`${longd}.${longm}`),
        Number(`${latd}.${latm}`),
      ];
    }

    return null;
  }

  private getExtraLayers(): Layer[] {
    const { geoJSON } = this.props;
    const extraLayers = [];

    if (geoJSON) {
      extraLayers.push(
        new VectorLayer({
          source: new VectorSource({
            features: (new GeoJSON()).readFeatures(geoJSON),
          }),
        }),
      );
    }
    const coordinates = this.coordinates();
    if (coordinates) {
      extraLayers.push(
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(fromLonLat(coordinates)),
              }),
            ],
          }),
        }),
      );
    }

    return extraLayers;
  }

  private createMap() {
    const { current } = this.mapRef;

    const coordinates = this.coordinates();

    if (!(current && coordinates) || this.map) {
      return null;
    }

    const center = fromLonLat(coordinates);

    this.map = new Map({
      controls: this.props.controls,
      layers: [
        new TileLayer({
          source: new XYZ({
            // url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
          }),
        }),
        ...this.getExtraLayers(),
      ],
      target: current,
      view: new View({
        center,
        zoom: this.props.zoom || 6,
      }),
    });
  }
}
