import { Grid, TableBody } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { WordWrapProperty } from "csstype";
import { Property } from "link-redux";
import * as React from "react";

import { InfoList } from "../canvasses/InfoList/InfoList";
import { TypeCollector } from "../helpers/TypeCollector";
import { NameProps } from "../helpers/types";
import { NS } from "../LRS";

import { PropertyInfoTable } from "./PropertyInfoTable";

const useStyles = makeStyles({
    contain: {
        minWidth: "20em",
        wordWrap: "break-word" as WordWrapProperty,
    },
});

export const ArticleLayout = ({ children }) => {
  const classes = useStyles({});

  return (
    <React.Fragment>
        <Grid item className={classes.contain} xs={12} sm={10} md={7} lg={7} xl={6}>
                {children}
                <PropertyInfoTable label={NS.dbo("wikiPageExternalLink")} />
        </Grid>
        <Grid item className={classes.contain} xs={12} sm={10} md={5} lg={4} xl={3}>
            <InfoList>
                <caption>
                    <Property label={NameProps}/>
                </caption>
                {/* `Type` renders the current subject, thus ourselves */}
                <TableBody>
                    <TypeCollector />
                </TableBody>
            </InfoList>
        </Grid>
    </React.Fragment>
  );
};
