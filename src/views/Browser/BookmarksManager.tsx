import { Button, Grid } from "@material-ui/core";
import { LinkedResourceContainer, useLRS } from "link-redux";
import * as React from "react";

import { useBookmarks } from "../../hooks/useBookmarks";
import { useStorage } from "../../hooks/useStorage";
import browser from "../../ontology/browser";
import { ArticleTopology } from "../../topologies";

export const BookmarksManager = () => {
  const lrs = useLRS();
  const storage = useStorage();
  const bookmarks = useBookmarks();

  if (!storage) {
    return (
      <div>
        No storage link found for session, are you logged in?
      </div>
    );
  }

  return (
    <Grid
      direction="row"
      justify="flex-start"
    >
      <LinkedResourceContainer
        subject={bookmarks}
        onError={() => (
          <Button
            className="Button"
            onClick={() => lrs.actions.browser.initBookmarksManager(bookmarks)}
          >
            Initialize
          </Button>
        )}
      />
    </Grid>
  );
};

BookmarksManager.type = browser.ns("BookmarksManager");

BookmarksManager.topology = ArticleTopology;
