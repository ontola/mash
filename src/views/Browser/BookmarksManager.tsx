import { Button, Grid } from "@material-ui/core";
import { LinkedResourceContainer, useLRS } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";
import { useStorage } from "../../hooks/useStorage";

import { NS } from "../../LRS";
import { ArticleTopology } from "../../topologies";

export const BookmarksManager = () => {
  const lrs = useLRS();
  const storage = useStorage();

  if (!storage) {
    return (
      <div>
        No storage link found for session, are you logged in?
      </div>
    );
  }

  const bookmarks = new NamedNode(`${storage.value}public/bookmarks`);

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

BookmarksManager.type = NS.browser("BookmarksManager");

BookmarksManager.topology = ArticleTopology;
