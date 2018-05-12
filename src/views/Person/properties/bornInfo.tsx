import LinkedRenderStore from "link-lib";
import { link, LinkedResourceContainer } from "link-redux";
import * as React from "react";
import InfoListItemLabel from "../../../components/InfoListItemLabel";
import InfoListItemText from "../../../components/InfoListItemText";

import { NameTypes, PersonTypes } from "../../../helpers/types";
import { NS } from "../../../LRS";
import { InfoListTopology } from "../../../topologies";
import { InfoListItem } from "../../../topologies/InfoListItem";

const PersonBornInfoList = ({ birthDate, birthName, birthPlace, fallbackName }) => {
  if (!(birthDate || birthName || birthPlace)) {
    return null;
  }

  let BirthPlaceLabel;
  if (birthPlace && birthPlace.termType === "NamedNode") {
    BirthPlaceLabel = () => (
      <React.Fragment>
        {" in "}<LinkedResourceContainer subject={birthPlace} />
      </React.Fragment>
    );
  } else if (birthPlace && birthPlace.termType === "Literal") {
    BirthPlaceLabel = () => ` in ${birthPlace.value}`;
  }

  let name = birthName ? birthName.value : "";
  if (!birthName) {
    name = fallbackName ? fallbackName.value : "";
  }

  const label = `${name}${birthDate ? ` on ${birthDate.value}` : ""}`;

  return (
    <InfoListItem>
      <InfoListItemLabel>Born</InfoListItemLabel>
      <InfoListItemText>{label}{BirthPlaceLabel && <BirthPlaceLabel />}</InfoListItemText>
    </InfoListItem>
  );
};

export default LinkedRenderStore.registerRenderer(
  link({
    birthDate: NS.dbo("birthDate"),
    birthName: NS.dbo("birthName"),
    birthPlace: NS.dbo("birthPlace"),
    fallbackName: {
      label: NameTypes,
    },
  })(PersonBornInfoList),
  PersonTypes,
  NS.app("bornInfo"),
  InfoListTopology,
);
