import { TableCell, withStyles } from "material-ui";
import { StyleRules } from "material-ui/styles";
import * as React from "react";

const styles = {
    primary: {
        textAlign: "left",
    },
    wrapper: {
        padding: 0,
    },
} as StyleRules;

const InfoListItemText = ({ children, classes }) => (
    <TableCell classes={classes} className={classes.wrapper}>
        {children}
    </TableCell>
);

export default withStyles(styles)(InfoListItemText);
