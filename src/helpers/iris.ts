import { Location } from "history";
import { SomeNode } from "link-lib";
import { NamedNode } from "rdflib";
import template from "url-template";

import { NS } from "../LRS";

export const iris = {
    resource: template.parse("/resource{/view}{?iri}"),
};

function resourceIRIToIRL(iri: string) {
    const dataIRI = new URL(iri);
    switch (dataIRI.host) {
        case "www.wikidata.org":
            const id = dataIRI.pathname.split("/").pop();
            return new NamedNode(`https://www.wikidata.org/wiki/Special:EntityData/${id}.n3`);
        default:
            return new NamedNode(`${iri}.n3`);
    }
}

export function articleToWikiIRISet(article: Location) {
    if (article.pathname.startsWith("/resource")) {
        const iri = new NamedNode(new URLSearchParams(article.search).get("iri"));
        return {
            data: resourceIRIToIRL(iri.value),
            iri,
            page: iri,
        };
    }

    const dbpediaSafeArticle = article.pathname.split("/").pop().trim().replace(/\s/g, "_");
    return {
        data: NS.dbpediaData(`${dbpediaSafeArticle}.n3`),
        iri:  NS.dbpedia(dbpediaSafeArticle),
        page: new NamedNode(`http://dbpedia.org/page/${dbpediaSafeArticle}`),
    };
}

export function resourceToWikiPath(iri: SomeNode | string): string {
    if (!iri) {
        return "";
    }

    const strIRI = typeof iri === "string" ? iri : iri.value;

    let prefix = "wiki";
    let base = NS.dbpedia("").value;
    if (strIRI.startsWith("_:") || typeof iri !== "string" && iri.termType === "BlankNode") {
        throw Error("Blank node passed to resourceToWikiPath");
    // } else if (strIRI.startsWith(NS.dbo("").value)) {
    //     prefix = "ontology";
    //     base = NS.dbo("").value;
    } else if (strIRI.startsWith(NS.dbp("").value)) {
        prefix = "property";
        base = NS.dbp("").value;
    } else {
        return `/resource?iri=${encodeURIComponent(strIRI)}`;
    }

    const article = dbpediaToWikiQuery(base, iri);

    return `/${prefix}/${article}`;
}

export function dbpediaToWikiQuery(base, iri: NamedNode | string): string {
    if (!iri || typeof iri !== "string" && iri.termType !== "NamedNode") {
        return "";
    }

    return (typeof iri === "string" ? iri : iri.value)
        .replace(base, "")
        .replace(/_/g, " ");
}

export function tryShorten(iri: NamedNode): string {
    if (iri.value.startsWith(":")) {
        return iri.toString();
    }
    const shortMap = Object
        .keys(NS)
        .map((ns) => ({ [NS[ns]("").value]: ns }))
        .reduce((a, b) => Object.assign(a, b));

    const entries = Object.entries(shortMap);

    for (const [key, value] of entries) {
        if (iri.value.includes(key)) {
            return `${value}:${iri.value.split(key)[1]}`;
        }
    }

    return iri.term;
}
