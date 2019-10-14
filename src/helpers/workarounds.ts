import { BlankNode, NamedNode, Term } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { IndexedFormula } from "rdflib";

import { LRS } from "../LRS";
import wdp from "../ontology/wdp";

// @ts-ignore
LRS.api.setAcceptForHost("http://dbpedia.org", "text/turtle");
// @ts-ignore
LRS.api.setAcceptForHost("http://www.wikidata.org/", "text/turtle");
// @ts-ignore
LRS.api.setAcceptForHost("https://www.wikidata.org/", "text/turtle");
// @ts-ignore
LRS.api.setAcceptForHost("https://argu.co/", "application/n-quads");

/* Just run everything through the proxy, should drastically reduce the bug surface */
// @ts-ignore
LRS.api.fetcher.constructor.proxyIfNecessary = (uri) => {
// @ts-ignore
    return LRS.api.fetcher
        .constructor
        .crossSiteProxyTemplate
        .replace("{uri}", encodeURIComponent(uri));
};

/**
 * Normalize wikidata instanceof properties to generic rdf:type.
 */
// @ts-ignore
LRS.store.store.newPropertyAction(
    wdp.ns("P31"),
    (formula: IndexedFormula, subj: NamedNode | BlankNode, _pred: NamedNode, obj: Term) => {
        const type = formula.statementsMatching(obj, wdp.ns("statement/P31"));

        if (type) {
            type.map(({ object }) => formula.add(subj, rdf.type, object));
        }

        return true;
    },
);
