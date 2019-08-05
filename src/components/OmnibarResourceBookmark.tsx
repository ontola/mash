import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Popover,
  TextField,
  Tooltip,
  Typography, Zoom
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Star, StarBorder } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import {
  LinkedResourceContainer, Property,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from "link-redux";
import { Literal, NamedNode, Namespace } from "rdflib";
import * as React from "react";

import { NameProps } from "../helpers/types";
import { useStorage } from "../hooks/useStorage";
import { NS } from "../LRS";

const nfo = Namespace("http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#");

const useStyles = makeStyles({
  root: {
    margin: "0",
  },
});

export const OmnibarResourceBookmark = ({ subject }) => {
  const lrs = useLRS();
  const classes = useStyles({});
  const storage = useStorage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const bookmarks = storage ? new NamedNode(`${storage.value}public/bookmarks`) : undefined;

  const existingBookmarks = bookmarks && subject && lrs.findSubject(
    bookmarks,
    [NS.rdfs("member"), nfo("bookmarks")],
    subject,
  );
  const existingBookmark = existingBookmarks && existingBookmarks[0];
  const open = Boolean(anchorEl && existingBookmark);

  const updateSubject = subject || new NamedNode("about:blank");
  const lastUpdate = useDataInvalidation({
    dataSubjects: [
      bookmarks,
      existingBookmark,
    ].filter(Boolean),
    subject: updateSubject,
  });
  useDataFetching({ subject: bookmarks || updateSubject }, lastUpdate);

  if (!storage || !subject) {
    return null;
  }

  const createBookmark = (e) => {
    const title = lrs.getResourceProperty(subject, NameProps);
    lrs.actions.browser.createBookmark(bookmarks, subject, title || new Literal(""));
    // TODO: Use dialog for mobile
    setAnchorEl(e.currentTarget);
  };

  const onClick = existingBookmark
    ? (e) => setAnchorEl(e.currentTarget)
    : createBookmark;

  const removeBookmark = () => {
    setAnchorEl(null);
    lrs.actions.browser.deleteBookmark(bookmarks, existingBookmark);
  };

  return (
    <React.Fragment>
      <IconButton
        edge="end"
        aria-label="Bookmark"
        aria-haspopup="true"
        classes={classes}
        color="inherit"
        onClick={onClick}
      >
        {existingBookmark
          ? <Tooltip title={"Edit bookmark"} TransitionComponent={Zoom}><Star /></Tooltip>
          : <Tooltip title={"Bookmark this resource"} TransitionComponent={Zoom}><StarBorder /></Tooltip>}
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <DialogTitle>
          <Typography variant="h5">Edit bookmark</Typography>
        </DialogTitle>
        <DialogContent>
          {existingBookmark &&
            <LinkedResourceContainer forceRender subject={existingBookmark}>
              <Property label={NS.schema("name")}>
                {(value) => (
                  <TextField
                    autoFocus
                    fullWidth
                    id="name"
                    label="Name"
                    margin="dense"
                    type="text"
                    value={value ? value : ""}
                    onChange={(e) => lrs.actions.browser.updateBookmark(
                      bookmarks,
                      existingBookmark,
                      e.target.value,
                    )}
                  />
                )}
              </Property>
            </LinkedResourceContainer>
          }
        </DialogContent>
        <DialogActions>
          <Button
            onClick={removeBookmark}
            variant="outlined"
          >
            Remove
          </Button>
        </DialogActions>
      </Popover>
    </React.Fragment>
  );
};
