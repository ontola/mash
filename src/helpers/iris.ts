import { namedNodeByIRI } from "link-lib";
import { NamedNode } from "rdflib";
import { NS } from "../LRS";

export function articleToDBPediaIRISet(article: string) {
    const dbpediaSafeArticle = article.trim().replace(/\s/g, "_");
    return {
        data: NS.dbpediaData(`${dbpediaSafeArticle}.n3`),
        iri:  NS.dbpedia(dbpediaSafeArticle),
        page: namedNodeByIRI(`http://dbpedia.org/page/${dbpediaSafeArticle}`),
    };
}

export function dbpediaToWikiPath(iri: NamedNode | string): string {
    if (!iri) {
        return "";
    }

    const strIRI = typeof iri === "string" ? iri : iri.value;

    let prefix = "wiki";
    let base = NS.dbpedia("").value;
    if (strIRI.startsWith(NS.dbo("").value)) {
        prefix = "ontology";
        base = NS.dbo("").value;
    } else if (strIRI.startsWith(NS.dbp("").value)) {
        prefix = "property";
        base = NS.dbp("").value;
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
