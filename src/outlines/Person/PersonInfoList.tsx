import { Property } from "link-redux";
import * as React from "react";

import {
  GenderProps,
  HeightProps,
  PersonTypes,
  SpouseProps,
} from "../../helpers/types";
import app from "../../ontology/app";
import dbo from "../../ontology/dbo";
import { InfoListTopology } from "../../topologies";
import { InfoListSection } from "../../topologies/InfoList/InfoListSection";

export class PersonInfoList extends React.PureComponent {
  public static type = PersonTypes;

  public static topology = InfoListTopology;

  public render() {
    return (
      <InfoListSection>
        <Property forceRender label={app.ns("bornInfo")} />
        <Property forceRender label={app.ns("deathInfo")} />
        <Property label={GenderProps} />
        <Property label={dbo.ns("occupation")} />
        <Property label={dbo.ns("nationality")} />
        <Property label={dbo.ns("almaMater")} />
        <Property label={SpouseProps} />
        <Property label={dbo.ns("children")} />

        <Property label={HeightProps} />
      </InfoListSection>
    );
  }
}
