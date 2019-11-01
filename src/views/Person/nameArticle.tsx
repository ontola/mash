import * as React from "react";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import InfoListItemText from "../../components/InfoListItemText";
import { NameProps, PersonTypes } from "../../helpers/types";
import { ArticleTopology } from "../../topologies";

const PersonNameArticle = ({
  linkedProp,
}) => (
  <React.Fragment>
      <InfoListItemLabel>Name</InfoListItemLabel>
      <InfoListItemText>{linkedProp.value}</InfoListItemText>
  </React.Fragment>
);

PersonNameArticle.type = PersonTypes;

PersonNameArticle.property = NameProps;

PersonNameArticle.topology = ArticleTopology;

export default PersonNameArticle;
