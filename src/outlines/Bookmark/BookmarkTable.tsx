import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/styles";
import { createNS } from "@ontologies/core";
import { Property, useLRS } from "link-redux";
import * as React from "react";

import { EditableProperty } from "../../components/EditableProperty";
import { LDLink } from "../../components/LDLink";
import { ImageProps, NameProps } from "../../helpers/types";
import { TableTopology } from "../../topologies";
import { Chip } from "../../topologies/Chip";

const nfo = createNS("http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#");

const useStyles = makeStyles({
  resourceLink: {
    ["&:visited"]: {
      color: "rgb(100, 94, 94)",
    },
    color: "rgb(100, 94, 94)",
  },
});

export const BookmarkTable = ({ folder, subject }) => {
  const classes = useStyles({});
  const lrs = useLRS();

  return (
    <TableRow>
      <TableCell>
        <EditableProperty
          label={NameProps}
          onEdit={(e) => lrs.actions.browser.updateBookmark(
            folder,
            subject,
            e.target.value,
          )}
        >
          {([ name ]) => (
            <Typography>
              {name.value}
            </Typography>
          )}
        </EditableProperty>
      </TableCell>
      <TableCell>
        <Property label={nfo("bookmarks")}>
          {([ resource ]) => (
            <LDLink className={classes.resourceLink} to={resource}>
              <Typography variant="caption">
                {resource.value}
              </Typography>
            </LDLink>
          )}
        </Property>
      </TableCell>
      <TableCell>
        <Chip
          avatar={(
            <Property label={nfo("bookmarks")}>
              <Property label={ImageProps} />
            </Property>
          )}
          label={(
            <Property label={nfo("bookmarks")}>
              <Property label={NameProps} />
            </Property>
          )}
        />
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="Delete bookmark"
          onClick={() => lrs.actions.browser.deleteBookmark(folder, subject)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

BookmarkTable.type = nfo("Bookmark");

BookmarkTable.topology = TableTopology;
