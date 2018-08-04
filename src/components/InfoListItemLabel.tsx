import { createStyles, TableCell, withStyles } from "@material-ui/core";
import * as React from "react";

import { InfoListCell } from "../canvasses/InfoList/InfoListCell";

const styles = createStyles({
    primary: {
        maxWidth: "10em",
        width: "max-content",
    },
    wrapper: {
        firstLetter: {
            textTransform: "capitalize",
        },
        minWidth: "6em",
    },
});

const InfoListItemLabel = ({ children, classes }) => (
    <TableCell
        classes={classes}
        className={classes.wrapper}
        colSpan={2}
        scope="row"
        // type="head"
        variant="head"
    >
        <InfoListCell>
          {children}
        </InfoListCell>
    </TableCell>
);

export default withStyles(styles)(InfoListItemLabel);
