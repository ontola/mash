import { ArticleTopology } from "./Article";
import { ArticleTableTopology } from "./ArticleTable";
import { ArticleTableCellTopology } from "./ArticleTableCell";
import { ChipTopology } from "./Chip";
import { DataGridTopology } from "./DataGrid";
import { DataGridCellListItemTopology } from "./DataGridCellListItem";
import { InfoListTopology } from "./InfoList";
import { InfoListItemTopology } from "./InfoListItem";

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
    ChipTopology,
    DataGridTopology,
    DataGridCellListItemTopology,
    InfoListTopology,
    InfoListItemTopology,
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
    ChipTopology,
    DataGridTopology,
    DataGridCellListItemTopology,
    InfoListTopology,
    InfoListItemTopology,
};
