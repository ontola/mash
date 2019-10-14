import rdfFactory from "@ontologies/core";
import { useLRS } from "link-redux";
import * as React from "react";

import { useStorage } from "./useStorage";

export const useBookmarks = () => {
  const lrs = useLRS();
  const storage = useStorage();

  const bookmarks = storage && rdfFactory.namedNode(`${storage.value}public/bookmarks`);
  const status = storage ? lrs.getStatus(bookmarks) : { requested: null };
  React.useEffect(() => {
    if (status.requested === null) {
      return;
    }
    if (!status.requested) {
      lrs.getEntity(bookmarks);
    }
  }, [status.requested]);

  return bookmarks;
};
