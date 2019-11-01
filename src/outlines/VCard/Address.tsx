import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Property } from "link-redux";
import * as React from "react";
import urlTemplate from "url-template";
import { MapView } from "../../components/MapView";

import vcard from "../../ontology/vcard";
import { CardTopology } from "../../topologies";

// const nominatimApi = "https://nominatim.openstreetmap.org/search{?street,city,county,state,country,postalcode,format}";
const nominatimApi = "https://photon.komoot.de/api/?q={street,city,county,state,country,postalcode}";
const lookupTemplate = urlTemplate.parse(nominatimApi).expand;

export const Address = ({
  city,
  country,
  county,
  postalcode,
  street,
}) => {
  const lookup = lookupTemplate({
    city,
    country,
    county,
    format: "geojson",
    postalcode,
    street,
  });
  const [ address, setAddress ] = React.useState();

  React.useEffect(() => {
    fetch(lookup)
      .then((res) => res.json())
      .then((geojson) => setAddress(geojson));
  }, []);

  const point = address?.features?.[0]?.geometry?.coordinates;
  const extent = address?.features?.[0]?.properties?.extent;

  return (
    <CardContent>
      <Grid container direction="row">
        <Grid item xs={12} sm={4}>
          <Grid container direction="column">
            <Grid item>
              <Property label={vcard.streetAddress} />
            </Grid>
            <Grid item>
              <Property label={vcard.locality} />
            </Grid>
            <Grid item>
              <Property label={vcard.postalCode} />
            </Grid>
            <Grid item>
              <Property label={vcard.region} />
            </Grid>
            <Grid item>
              <Property label={vcard.countryName} />
            </Grid>
          </Grid>
        </Grid>
        {point && (
          <Grid item xs={12} sm={8}>
            <MapView
              controls={[]}
              extent={extent}
              lat={point[1]}
              lon={point[0]}
              zoom={18}
            />
          </Grid>
        )}
      </Grid>
    </CardContent>
  );
};

Address.type = vcard.Address;

Address.topology = CardTopology;

Address.mapDataToProps = {
  city: vcard.locality,
  country: vcard.countryName,
  county: vcard.region,
  postalcode: vcard.postalCode,
  street: vcard.streetAddress,
};

Address.linkOpts = {
  returnType: "value",
};
