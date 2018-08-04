import { TableCell, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import * as React from "react";

import { InfoListCell } from "../canvasses/InfoList/InfoListCell";

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
        <InfoListCell>
            {children}
        </InfoListCell>
    </TableCell>
);

export default withStyles(styles)(InfoListItemText);
