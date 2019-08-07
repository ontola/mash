import { link, RegistrableComponentClass } from "link-redux";
import { PropertyArticleTable } from "../../components/PropertyArticleTable";

import { PersonTypes } from "../../helpers/types";
import { NS } from "../../LRS";
import { ArticleTopology } from "../../topologies";

const cells = [
    NS.dbo("team"),
    NS.dbo("years"),
    NS.dbo("numberOfMatches"),
    NS.dbo("numberOfGoals"),
];

export const CareerStation = link({
  prop: {
    label: NS.dbo("careerStation"),
    limit: Infinity,
  },
})(PropertyArticleTable(cells, NS.dbo("careerStation"))) as RegistrableComponentClass<any>;

CareerStation.type = PersonTypes;

CareerStation.property = NS.dbo("careerStation");

CareerStation.topology = ArticleTopology;
