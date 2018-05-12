import LinkedRenderStore from "link-lib";
import { link } from "link-redux";
import { PropertyArticleTable } from "../../../components/PropertyArticleTable";

import { PersonTypes } from "../../../helpers/types";
import { NS } from "../../../LRS";
import { ArticleTopology } from "../../../topologies";

const cells = [
    NS.dbo("team"),
    NS.dbo("years"),
    NS.dbo("numberOfMatches"),
    NS.dbo("numberOfGoals"),
];

export default LinkedRenderStore.registerRenderer(
  link({
      prop: {
          label: NS.dbo("careerStation"),
          limit: Infinity,
      },
  })(PropertyArticleTable(cells, NS.dbo("careerStation"))),
  PersonTypes,
  NS.dbo("careerStation"),
  ArticleTopology,
);
