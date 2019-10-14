import { TableBody, TableCell, TableHead, Typography } from "@material-ui/core";
import rdfs from "@ontologies/rdfs";
import { Property } from "link-redux";
import * as React from "react";

import { NameProps } from "../../helpers/types";
import browser from "../../ontology/browser";
import { ArticleTopology } from "../../topologies";
import { Table } from "../../topologies/Table";

const FolderProperty = Property as any;

export const BookmarksListArticle = ({ subject }) => (
  <React.Fragment>
    <Property label={NameProps}>
      {([ name ]) => <Typography component="h1" variant="h2">{name.value}</Typography>}
    </Property>
    <Table>
      <TableHead>
        <TableCell>Name</TableCell>
        <TableCell>Link</TableCell>
        <TableCell>Preview</TableCell>
        <TableCell>Remove</TableCell>
      </TableHead>
      <TableBody>
        <FolderProperty
          folder={subject}
          label={rdfs.member}
          limit={Infinity}
        />
      </TableBody>
    </Table>
  </React.Fragment>
);

BookmarksListArticle.type = browser.ns("BookmarksList");

BookmarksListArticle.topology = ArticleTopology;
