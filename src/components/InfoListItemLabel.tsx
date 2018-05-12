import { TableCell, withStyles } from "material-ui";
import * as React from "react";

declare module "material-ui/Table/TableCell" {
    interface TableCellProps {
        colSpan?: number;
        variant?: string;
    }
}

const styles = {
    primary: {
        maxWidth: "10em",
        width: "max-content",
    },
    wrapper: {
        minWidth: "6em",
    },
};

const InfoListItemLabel = ({ children, classes }) => (
    <TableCell
        classes={classes}
        className={classes.wrapper}
        colSpan={2}
        scope="row"
        type="head"
        variant="head"
    >
        {children}
    </TableCell>
);

export default withStyles(styles)(InfoListItemLabel);
