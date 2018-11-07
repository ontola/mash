import { BlankNode, IndexedFormula, NamedNode, SomeTerm } from "rdflib";
import { LRS, NS } from "../LRS";
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
    return LRS.api
        .fetcher
        .constructor
        .crossSiteProxyTemplate
        .replace("{uri}", encodeURIComponent(uri));
};

/**
 * Normalize wikidata instanceof properties to generic rdf:type.
 */
// @ts-ignore
LRS.store.store.newPropertyAction(
    NS.p("P31"),
    (formula: IndexedFormula, subj: NamedNode | BlankNode, _pred: NamedNode, obj: SomeTerm) => {
        const type = formula.statementsMatching(obj, NS.p("statement/P31"));

        if (type) {
            type.map(({ object }) => formula.add(subj, NS.rdf("type"), object));
        }

        return true;
    },
);
