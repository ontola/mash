import { ArticleTopology } from "./Article/Article";
import { ArticleTableTopology } from "./Article/ArticleTable";
import { ArticleTableCellTopology } from "./Article/ArticleTableCell";
import { ArticleTableRowTopology } from "./Article/ArticleTableRow";
import { ChipTopology } from "./Chip";
import { DataGridTopology } from "./DataGrid/DataGrid";
import { DataGridCellListItemTopology } from "./DataGrid/DataGridCellListItem";
import { GridListTopology } from "./GridList";
import { IconTopology } from "./Icon";
import { InfoListTopology } from "./InfoList/InfoList";
import { InfoListCellTopology } from "./InfoList/InfoListCell";
import { InfoListItemTopology } from "./InfoList/InfoListItem";
import { InfoListSectionTopology } from "./InfoList/InfoListSection";
import { DialogTopology } from "./Ontola/Dialog";
import { TableTopology } from "./Table";

/**
 * It's useful to have a central source of valid application topologies. This also provides a
 * location to document the intended usage.
 *
 * A common issue when beginning with link is forgetting to set the correct topology(ies), so
 * defaulting to registering views under all topologies can prevent a lot of headaches. Mind that
 * over-registering might cause the wrong view to be rendered rather than none at all.
 */
export const allTopologies = [
  // This defaults to the `DEFAULT_TOPOLOGY` from link-lib
  // Generally used to mean that the resource is the main content on the page.
  undefined,
  ArticleTopology,
  ArticleTableTopology,
  ArticleTableCellTopology,
  ArticleTableRowTopology,
  ChipTopology,
  DataGridTopology,
  DataGridCellListItemTopology,
  DialogTopology,
  GridListTopology,
  IconTopology,
  InfoListTopology,
  InfoListCellTopology,
  InfoListItemTopology,
  InfoListSectionTopology,
  TableTopology,
];

export function allTopologiesExcept(...topologies) {
  const filtered = allTopologies.slice();
  topologies.forEach((t) => {
    const i = filtered.indexOf(t);
    if (i !== -1) {
      filtered.splice(i, 1);
    }
  });

  return filtered;
}

export {
  ArticleTopology,
  ArticleTableTopology,
  ArticleTableCellTopology,
  ArticleTableRowTopology,
  DialogTopology,
  ChipTopology,
  DataGridTopology,
  DataGridCellListItemTopology,
  GridListTopology,
  IconTopology,
  InfoListTopology,
  InfoListCellTopology,
  InfoListItemTopology,
  InfoListSectionTopology,
  TableTopology
};
