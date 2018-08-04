import { Grid, TableBody, withStyles } from "@material-ui/core";
import { WordWrapProperty } from "csstype";
import { Property } from "link-redux";
import * as React from "react";

import { InfoList } from "../canvasses/InfoList/InfoList";
import { TypeCollector } from "../helpers/TypeCollector";
import { NameTypes } from "../helpers/types";
import { NS } from "../LRS";

import { PropertyInfoTable } from "./PropertyInfoTable";

const styles = {
    contain: {
        minWidth: "20em",
        wordWrap: "break-word" as WordWrapProperty,
    },
};

const ArticleLayoutComp = ({ children, classes }) => (
    <React.Fragment>
        <Grid item className={classes.contain} xs={12} sm={10} md={7} lg={7} xl={6}>
                {children}
                <PropertyInfoTable label={NS.dbo("wikiPageExternalLink")} />
        </Grid>
        <Grid item className={classes.contain} xs={12} sm={10} md={5} lg={4} xl={3}>
            <InfoList>
                <caption>
                    <Property label={NameTypes}/>
                </caption>
                {/* `Type` renders the current subject, thus ourselves */}
                <TableBody>
                    <TypeCollector />
                </TableBody>
            </InfoList>
        </Grid>
    </React.Fragment>
);

export const ArticleLayout = withStyles(styles)(ArticleLayoutComp);
