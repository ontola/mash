import { TableBody, TableCell, TableHead, Typography } from "@material-ui/core";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { ArticleTable } from "../topologies/Article/ArticleTable";

export const PropertyArticleTable = (cells, label) => ({ prop }) => (
    <React.Fragment>
        <Typography variant="h3">{label.term}</Typography>
        <ArticleTable>
            <TableHead>
                {cells.map((c) => <TableCell key={c.value}>{c.term}</TableCell>)}
            </TableHead>
            <TableBody>
                {prop.map((cs) => (
                    <LinkedResourceContainer
                        cells={cells}
                        key={cs.value}
                        subject={cs}
                    />
                ))}
            </TableBody>
        </ArticleTable>
    </React.Fragment>
);
