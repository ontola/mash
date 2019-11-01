import { CardContent } from "@material-ui/core";
import rdf from "@ontologies/rdf";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import vcard from "../../ontology/vcard";
import { CardTopology } from "../../topologies";

export const ValueTypes = ({
  types,
  value,
}) => {
  const renderableTypes = ValueTypes.type.map((vt) => vt.value);
  const contextType = types.filter((t) => !renderableTypes.includes(t.value)).pop();

  return (
    <CardContent>
      <LinkedResourceContainer subject={contextType} /><a href={value.value}>{value.value}</a>
    </CardContent>
  );
};

ValueTypes.type = [
  vcard.Email,
  vcard.TelephoneType,
];

ValueTypes.topology = CardTopology;

ValueTypes.mapDataToProps = {
  types: {
    label: rdf.type,
    limit: Infinity,
  },
  value: vcard.value,
};
