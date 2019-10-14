import rdfFactory, { createNS, Literal, NamedNode, Node } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";
import schema from "@ontologies/schema";

import { actionIRI } from "../../helpers/iris";
import browser from "../../ontology/browser";
import ld from "../../ontology/ld";
import ll from "../../ontology/ll";

const nfo = createNS("http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#");

export const bookmarks = (store) => {
  const addGraph = (graph) => ld.ns(`add?graph=${encodeURIComponent(graph.value)}`);
  const replaceGraph = (graph) => ld.ns(`replace?graph=${encodeURIComponent(graph.value)}`);
  const sliceGraph = (graph) => ld.ns(`slice?graph=${encodeURIComponent(graph.value)}`);
  const purgeGraph = (graph) => ld.ns(`purge?graph=${encodeURIComponent(graph.value)}`);

  const bookmarksAction = (subject, action, payload = {}): NamedNode => {
    return browser.ns(`bookmarks/${actionIRI(subject, action, payload)}`);
  };

  const createBookmarksList = (listIRI) => ([
    [listIRI, rdf.type, browser.ns("BookmarksList"), addGraph(listIRI)],
    [listIRI, rdf.type, rdf.Bag, addGraph(listIRI)],
    [listIRI, schema.name, rdfFactory.literal("Public bookmarks"), addGraph(listIRI)],
  ]);

  const createBookmark = (
    listIRI: Node,
    resource: NamedNode,
    name: Literal,
  ) => {
    const newBookmark = rdfFactory.blankNode();

    return {
      bookmark: newBookmark,
      delta: [
        [newBookmark, rdf.type, nfo("Bookmark"), addGraph(listIRI)],
        [newBookmark, nfo("bookmarks"), resource, addGraph(listIRI)],
        [newBookmark, schema.name, name, addGraph(listIRI)],

        [listIRI, rdfs.member, newBookmark, addGraph(listIRI)],
      ],
    };
  };

  const updateBookmark = (
    listIRI: Node,
    bookmark: Node,
    name: Literal,
  ) => ([
    [bookmark, schema.name, name, replaceGraph(listIRI)],
  ]);

  const deleteBookmark = (
    listIRI: Node,
    bookmark: Node,
  ) => ([
    [listIRI, rdfs.member, bookmark, sliceGraph(listIRI)],
    [bookmark, ll.ns("nop"), ll.ns("nop"), purgeGraph(listIRI)],
  ]);

  return {
    // TODO: Migrate to symbols to avoid collisions entirely?
    actions: {
      // TODO: rename to addBookmarkToFolder etc
      createBookmark: (list, resource, title): Promise<void> =>
        store.exec(bookmarksAction(list, "create", { resource: resource.value, title })),
      deleteBookmark: (list, bookmark): Promise<void> =>
        store.exec(bookmarksAction(list, "delete", { bookmark: bookmark.value })),
      initBookmarksManager: (subject): Promise<void> => store.exec(bookmarksAction(subject, "initialize")),
      updateBookmark: (list, bookmark, title): Promise<void> =>
        store.exec(bookmarksAction(list, "update", { bookmark: bookmark.value, title })),
    },
    handle: (iri, _) => {
      if (!iri.value.startsWith(browser.ns("bookmarks/").value)) {
        return undefined;
      }

      if (iri.value.startsWith(browser.ns("bookmarks/initialize").value)) {
        const todoList = rdfFactory.namedNode(new URL(iri.value).searchParams.get("iri"));

        return store.processDelta(createBookmarksList(todoList))
          .then(() => store.api.fetcher.putBack(todoList));
      }

      if (iri.value.startsWith(browser.ns("bookmarks/create").value)) {
        const search = new URL(iri.value).searchParams;
        const todoList = rdfFactory.namedNode(search.get("iri"));
        const resource = rdfFactory.namedNode(search.get("resource"));
        const title = rdfFactory.literal(search.get("title"));

        const { bookmark, delta } = createBookmark(todoList, resource, title);

        return store.processDelta(delta)
          .then(() => store.api.fetcher.putBack(todoList))
          .then(() => bookmark);
      }

      if (iri.value.startsWith(browser.ns("bookmarks/update").value)) {
        const search = new URL(iri.value).searchParams;
        const todoList = rdfFactory.namedNode(search.get("iri"));
        const bookmarkVal = search.get("bookmark");
        const bookmark = bookmarkVal.includes(":")
          ? rdfFactory.namedNode(bookmarkVal)
          : rdfFactory.blankNode(bookmarkVal);
        const title = rdfFactory.literal(search.get("title"));

        const delta = updateBookmark(todoList, bookmark, title);

        return store.processDelta(delta, true)
          .then(() => store.api.fetcher.putBack(todoList));
      }

      if (iri.value.startsWith(browser.ns("bookmarks/delete").value)) {
        const search = new URL(iri.value).searchParams;
        const todoList = rdfFactory.namedNode(search.get("iri"));
        const bookmarkVal = search.get("bookmark");
        const bookmark = bookmarkVal.includes(":")
          ? rdfFactory.namedNode(bookmarkVal)
          : rdfFactory.blankNode(bookmarkVal);

        return store.processDelta(deleteBookmark(todoList, bookmark))
          .then(() => store.api.fetcher.putBack(todoList));
      }

      return undefined;
    },
    initialData: () => [
      [
        rdfFactory.namedNode("about:bookmarks"),
        rdf.type,
        browser.ns("BookmarksManager"),
        ld.replace,
      ],
    ],
  };
};
