import { SomeNode } from "link-lib";
import { BlankNode, Literal, NamedNode, Namespace } from "rdflib";
import { actionIRI } from "../../helpers/iris";

const nfo = Namespace("http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#");

export const bookmarks = (store, ns) => {
  const addGraph = (graph) => ns.ll(`add?graph=${encodeURIComponent(graph.value)}`);
  const replaceGraph = (graph) => ns.ll(`replace?graph=${encodeURIComponent(graph.value)}`);
  const sliceGraph = (graph) => ns.ll(`slice?graph=${encodeURIComponent(graph.value)}`);
  const purgeGraph = (graph) => ns.ll(`purge?graph=${encodeURIComponent(graph.value)}`);

  const bookmarksAction = (subject, action, payload = {}): NamedNode => {
    return ns.browser(`bookmarks/${actionIRI(subject, action, payload)}`);
  };

  const createBookmarksList = (listIRI) => ([
    [listIRI, ns.rdf("type"), ns.browser("BookmarksList"), addGraph(listIRI)],
    [listIRI, ns.rdf("type"), ns.rdfs("Bag"), addGraph(listIRI)],
    [listIRI, ns.schema("name"), new Literal("Public bookmarks"), addGraph(listIRI)],
  ]);

  const createBookmark = (
    listIRI: SomeNode,
    resource: NamedNode,
    name: Literal,
  ) => {
    const newBookmark = new BlankNode();

    return {
      bookmark: newBookmark,
      delta: [
        [newBookmark, ns.rdf("type"), nfo("Bookmark"), addGraph(listIRI)],
        [newBookmark, nfo("bookmarks"), resource, addGraph(listIRI)],
        [newBookmark, ns.schema("name"), name, addGraph(listIRI)],

        [listIRI, ns.rdfs("member"), newBookmark, addGraph(listIRI)],
      ],
    };
  };

  const updateBookmark = (
    listIRI: SomeNode,
    bookmark: SomeNode,
    name: Literal,
  ) => ([
    [bookmark, ns.schema("name"), name, replaceGraph(listIRI)],
  ]);

  const deleteBookmark = (
    listIRI: SomeNode,
    bookmark: SomeNode,
  ) => ([
    [listIRI, ns.rdfs("member"), bookmark, sliceGraph(listIRI)],
    [bookmark, ns.ll("nop"), ns.ll("nop"), purgeGraph(listIRI)],
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
      if (!iri.value.startsWith(ns.browser("bookmarks/").value)) {
        return undefined;
      }

      if (iri.value.startsWith(ns.browser("bookmarks/initialize").value)) {
        const todoList = new NamedNode(new URL(iri.value).searchParams.get("iri"));

        return store.processDelta(createBookmarksList(todoList))
          .then(() => store.api.fetcher.putBack(todoList));
      }

      if (iri.value.startsWith(ns.browser("bookmarks/create").value)) {
        const search = new URL(iri.value).searchParams;
        const todoList = new NamedNode(search.get("iri"));
        const resource = new NamedNode(search.get("resource"));
        const title = new Literal(search.get("title"));

        const { bookmark, delta } = createBookmark(todoList, resource, title);

        return store.processDelta(delta)
          .then(() => store.api.fetcher.putBack(todoList))
          .then(() => bookmark);
      }

      if (iri.value.startsWith(ns.browser("bookmarks/update").value)) {
        const search = new URL(iri.value).searchParams;
        const todoList = new NamedNode(search.get("iri"));
        const bookmarkVal = search.get("bookmark");
        const bookmark = bookmarkVal.includes(":") ? new NamedNode(bookmarkVal) : new BlankNode(bookmarkVal);
        const title = new Literal(search.get("title"));

        const delta = updateBookmark(todoList, bookmark, title);

        return store.processDelta(delta, true)
          .then(() => store.api.fetcher.putBack(todoList));
      }

      if (iri.value.startsWith(ns.browser("bookmarks/delete").value)) {
        const search = new URL(iri.value).searchParams;
        const todoList = new NamedNode(search.get("iri"));
        const bookmarkVal = search.get("bookmark");
        const bookmark = bookmarkVal.includes(":") ? new NamedNode(bookmarkVal) : new BlankNode(bookmarkVal);

        return store.processDelta(deleteBookmark(todoList, bookmark))
          .then(() => store.api.fetcher.putBack(todoList));
      }

      return undefined;
    },
    initialData: () => [
      [
        new NamedNode("about:bookmarks"),
        ns.rdf("type"),
        ns.browser("BookmarksManager"),
        ns.ll("replace"),
      ],
    ],
  };
};
