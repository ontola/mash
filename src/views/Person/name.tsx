import * as React from "react";

import { ArticleTopology } from "../../canvasses";
import InfoListItemLabel from "../../components/InfoListItemLabel";
import InfoListItemText from "../../components/InfoListItemText";
import { NameProps, PersonTypes } from "../../helpers/types";

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
