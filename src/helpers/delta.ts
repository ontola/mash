import ll from "../ontology/ll";

export const addGraph = (graph) => ll.ns(`add?graph=${encodeURIComponent(graph.value)}`);
export const replaceGraph = (graph) => ll.ns(`replace?graph=${encodeURIComponent(graph.value)}`);
export const sliceGraph = (graph) => ll.ns(`slice?graph=${encodeURIComponent(graph.value)}`);
export const purgeGraph = (graph) => ll.ns(`purge?graph=${encodeURIComponent(graph.value)}`);
export const removeGraph = (graph) => ll.ns(`remove?graph=${encodeURIComponent(graph.value)}`);
