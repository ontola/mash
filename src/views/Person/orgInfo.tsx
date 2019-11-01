import Typography from "@material-ui/core/Typography";
import * as React from "react";

import { PersonTypes } from "../../helpers/types";
import app from "../../ontology/app";
import vcard from "../../ontology/vcard";
import { allTopologies } from "../../topologies";

export const OrgInfo = ({
  className,
  orgName,
  role,
}) => {
  if (!orgName && !role) {
    return null;
  }

  const descriptiveString = [role?.value, orgName?.value].filter(Boolean).join(" at ");

  return (
    <Typography className={className} variant="subtitle1">
      {descriptiveString}
    </Typography>
  );
};

OrgInfo.type = PersonTypes;

OrgInfo.property = app.ns("orgInfo");

OrgInfo.topology = allTopologies;

OrgInfo.mapDataToProps = {
  orgName: vcard.ns("organization-name"),
  role: vcard.ns("role"),
};

OrgInfo.linkOpts = {
  forceRender: true,
};
