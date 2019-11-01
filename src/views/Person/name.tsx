import * as React from "react";

import { NameProps, PersonTypes } from "../../helpers/types";
import vcard from "../../ontology/vcard";
import main from "../../topologies/main";

const PersonName = ({
  linkedProp,
}) => (
  <h1>{linkedProp.value}</h1>
);

PersonName.type = PersonTypes;

PersonName.property = [vcard.ns("fn"), ...NameProps];

PersonName.topology = main;

export default PersonName;
