import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { LinkedResourceContainer, useLRS } from "link-redux";
import { SomeTerm, Statement } from "rdflib";
import * as React from "react";

import { LDLink } from "../components/LDLink";
import { groupBy } from "../helpers/data";
import { tryShorten } from "../helpers/iris";
import { PersonTypes, ThingTypes } from "../helpers/types";
import { NS } from "../LRS";
import { DataGridTopology } from "../topologies";
import { DataGridCellListItem } from "../topologies/DataGrid/DataGridCellListItem";

const PROPKEY = 0;
const STATEMENTS = 1;
const MAX_STMTS_DISPLAYED = 50000;

const useStyles = makeStyles({
  breakCell: {
    wordBreak: "break-word",
  },
  breakCellLink: {
    position: "sticky",
  },
  breakLabel: {
    minWidth: "4em",
    paddingLeft: ".5em",
    paddingRight: ".5em",
    position: "sticky",
    verticalAlign: "initial",
    wordBreak: "break-word",
  },
  table: {
    margin: "1.5em 0 1em",
  },
});

export const ResourceDataGrid = ({ subject: resource }) => {
  const lrs = useLRS();
  const classes = useStyles({});

  if (!resource) {
    return <p>No resource selected</p>;
  }

  const graphData = (lrs as any).store.match(null, null, null, resource.doc());

  const groups = graphData.length > 0
    ? groupBy(graphData, (s) => s.subject)
    : new Map().set(resource, lrs.tryEntity(resource));

  const tableForSubject = ([subject, statements]) => {
    const statementMap = statements.reduce((acc, cur: Statement) => {
      const accI = acc.findIndex((obp) => obp[PROPKEY] === cur.predicate);
      if (accI === -1) {
        acc.push([cur.predicate, new Set([cur.object])]);
      } else {
        acc[accI][STATEMENTS].add(cur.object);
      }

      return acc;
    }, []);

    return (
      <Table className={classes.table} key={subject.value}>
        <Typography component="caption" variant="h6">
          {subject.value}
        </Typography>
        <TableHead>
          <TableRow>
            <TableCell>Predicate</TableCell>
            <TableCell>Object</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statementMap.slice(0, MAX_STMTS_DISPLAYED).map((row, i) => (
            <TableRow key={`${row.toString()}-${i}`}>
              <TableCell className={classes.breakLabel} variant="head">
                {/*<LinkedResourceContainer subject={row[PROPKEY]} />*/}
                <LDLink className={classes.breakCellLink} to={row[PROPKEY]}>
                  {tryShorten(row[PROPKEY])}
                </LDLink>
              </TableCell>
              <TableCell className={classes.breakCell}>
                <ul>
                  {(Array.from(row[STATEMENTS]) as SomeTerm[]).map((s: SomeTerm, index) => {
                    if (s.termType === "NamedNode") {
                      const children = s.value.startsWith(NS.dbo("").value)
                        ? <LinkedResourceContainer subject={s}/>
                        : <LDLink to={s}>{s.toString()}</LDLink>;

                      return (
                        <DataGridCellListItem key={s.value}>
                          {children}
                        </DataGridCellListItem>
                      );
                    }

                    return <li key={`${s.value}-${index}`}><p>{s.toString()}</p></li>;
                  })}
                </ul>
              </TableCell>
            </TableRow>
          ))}
          {statementMap.length > MAX_STMTS_DISPLAYED &&
          <p>First 50.000 of {statementMap.length} statements shown</p>
          }
        </TableBody>
      </Table>
    );
  };

  return (
    <Grid container lg={9} xl={8}>
      {Array.from(groups, tableForSubject)}
    </Grid>
  );
};

ResourceDataGrid.type = [
  NS.rdfs("Resource"),
  ...PersonTypes,
  ...ThingTypes,
];

ResourceDataGrid.topology = DataGridTopology;
