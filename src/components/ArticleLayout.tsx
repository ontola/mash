import { WordWrapProperty } from "csstype";
import { Property, Type } from "link-redux";
import { Grid, TableBody, withStyles } from "material-ui";
import * as React from "react";

import { NameTypes } from "../helpers/types";
import { NS } from "../LRS";
import { InfoList } from "../topologies/InfoList";

import { PropertyInfoTable } from "./PropertyInfoTable";

const styles = {
    contain: {
        minWidth: "20em",
        wordWrap: "break-word" as WordWrapProperty,
    },
};

const ArticleLayoutComp = ({ children, classes }) => (
    <React.Fragment>
        <Grid item className={classes.contain} xs={12} md={7} lg={7} xl={6}>
                {children}
                <PropertyInfoTable label={NS.dbo("wikiPageExternalLink")} />
        </Grid>
        <Grid item className={classes.contain} xs={12} md={5} lg={4} xl={3}>
            <InfoList>
                <caption>
                    <Property label={NameTypes}/>
                </caption>
                {/* `Type` renders the current subject, thus ourselves */}
                <TableBody>
                    <Type />
                </TableBody>
            </InfoList>
        </Grid>
    </React.Fragment>
);

export const ArticleLayout = withStyles(styles)(ArticleLayoutComp);
