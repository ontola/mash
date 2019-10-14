import {
  Collapse,
  Grid,
  Grow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { PlainFactory } from "@ontologies/core";
import { LinkedResourceContainer, useLRS } from "link-redux";
import { SomeTerm, Statement } from "rdflib";
import * as React from "react";

import { tryShorten } from "../helpers/iris";
import dbo from "../ontology/dbo";
import { DataGridCellListItem } from "../topologies/DataGrid/DataGridCellListItem";

import { LDLink } from "./LDLink";
import { PropertyInput } from "./PropertyInput";

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
  captionActions: {
    cursor: "pointer",
    float: "right",
  },
  input: {
    width: "100%",
  },
  table: {
    margin: "1.5em 0 1em",
  },
  title: {
    flex: "1 1 100%",
  },
});

const factory = new PlainFactory();

const SubResourceTable = ({ editing, graph, subject, statements }) => {
  const classes = useStyles({});
  const lrs = useLRS();

  const removeResource = () => {
    // The normal store methods (and the delta system) are too smart and reason to include more than we want
    const delta = (lrs as any)
      .store
      .store
      .statements
      .filter((s) => s.subject === subject && s.why === graph);

    (lrs as any).store.removeStatements(delta);
    (lrs as any).store.touch(graph);
  };

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
    <Grid item xs={12}>
      <Paper>
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
          >
            {subject.value}
          </Typography>
          <Grow in={editing}>
            <Tooltip title="Remove resource from graph">
              <DeleteIcon
                className={classes.captionActions}
                onClick={() => removeResource()}
              />
            </Tooltip>
          </Grow>
        </Toolbar>
        <Table className={classes.table} key={subject.value}>
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
                        const children = s.value.startsWith(dbo.ns("").value)
                          ? <LinkedResourceContainer subject={s}/>
                          : <LDLink to={s}>{factory.toNQ(s)}</LDLink>;

                        return (
                          <DataGridCellListItem key={s.value}>
                            {children}
                          </DataGridCellListItem>
                        );
                      }

                      return <li key={`${s.value}-${index}`}><p>{factory.toNQ(s)}</p></li>;
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
        <Collapse in={editing}>
          <PropertyInput
            className={classes.input}
            graph={graph}
            subject={subject}
          />
        </Collapse>
      </Paper>
    </Grid>
  );
};

export default SubResourceTable;
