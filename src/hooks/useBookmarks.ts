import { useLRS } from "link-redux";
import { NamedNode } from "rdflib";
import * as React from "react";

import { useStorage } from "./useStorage";

export const useBookmarks = () => {
  const lrs = useLRS();
  const storage = useStorage();

  const bookmarks = storage && new NamedNode(`${storage.value}public/bookmarks`);
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
