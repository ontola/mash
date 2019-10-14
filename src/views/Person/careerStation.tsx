import { link, RegistrableComponentClass } from "link-redux";
import { PropertyArticleTable } from "../../components/PropertyArticleTable";

import { PersonTypes } from "../../helpers/types";
import dbo from "../../ontology/dbo";
import { ArticleTopology } from "../../topologies";

const cells = [
    dbo.ns("team"),
    dbo.ns("years"),
    dbo.ns("numberOfMatches"),
    dbo.ns("numberOfGoals"),
];

export const CareerStation = link({
  prop: {
    label: dbo.ns("careerStation"),
    limit: Infinity,
  },
})(PropertyArticleTable(cells, dbo.ns("careerStation"))) as RegistrableComponentClass<any>;

CareerStation.type = PersonTypes;

CareerStation.property = dbo.ns("careerStation");

CareerStation.topology = ArticleTopology;
