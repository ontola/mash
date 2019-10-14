import rdfFactory, { NamedNode, TermType } from "@ontologies/core";
import { Location } from "history";
import { SomeNode } from "link-lib";
import template from "url-template";

import dbp from "../ontology/dbp";
import dbpedia from "../ontology/dbpedia";
import dbpediaData from "../ontology/dbpediaData";

export const iris = {
    resource: template.parse("/resource{/view}{?iri}"),
};

function resourceIRIToIRL(iri: string) {
    const dataIRI = new URL(iri);
    switch (dataIRI.host) {
        case "www.wikidata.org":
            const id = dataIRI.pathname.split("/").pop();
            return rdfFactory.namedNode(`https://www.wikidata.org/wiki/Special:EntityData/${id}.n3`);
        default:
            return rdfFactory.namedNode(`${iri}.n3`);
    }
}

export function actionIRI(subject, action, payload: { [k: string]: string } = {}) {
    const query = [
      subject && `iri=${subject.value}`,
      ...Object.entries<string>(payload).map(([k, v]) => [k, encodeURIComponent(v)].join("=")),
    ].filter(Boolean).join("&");

    return `${action}?${query}`;
}

export function articleToWikiIRISet(article: Location) {
    if (article.pathname.startsWith("/resource")) {
        const iri = rdfFactory.namedNode(decodeURIComponent(new URLSearchParams(article.search).get("iri")));
        return {
            data: resourceIRIToIRL(iri.value),
            iri,
            page: iri,
        };
    }

    const dbpediaSafeArticle = article.pathname.split("/").pop().trim().replace(/\s/g, "_");
    if (dbpediaSafeArticle) {
        return {
            data: dbpediaData.ns(`${dbpediaSafeArticle}.n3`),
            iri:  dbpedia.ns(dbpediaSafeArticle),
            page: rdfFactory.namedNode(`http://dbpedia.org/page/${dbpediaSafeArticle}`),
        };
    }

    return {
        data: undefined,
        iri: undefined,
        page: undefined,
    };
}

export function parentDir(iri: NamedNode): NamedNode {
    const url = new URL(iri.value);
    const endIndex = url.pathname.endsWith("/") ? -2 : -1;
    url.pathname = url.pathname.split("/").slice(0, endIndex).join("/");

    return rdfFactory.namedNode(url.toString());
}

export function resourceToWikiPath(iri: SomeNode | string): string {
    if (!iri) {
        return "";
    }

    const strIRI = typeof iri === "string" ? iri : iri.value;

    let prefix = "wiki";
    let base = dbpedia.ns("").value;
    if (strIRI.startsWith("_:") || typeof iri !== "string" && iri.termType === TermType.BlankNode) {
        throw Error("Blank node passed to resourceToWikiPath");
    // } else if (strIRI.startsWith(dbo.ns("").value)) {
    //     prefix = "ontology";
    //     base = dbo.ns("").value;
    } else if (strIRI.startsWith(dbp.ns("").value)) {
        prefix = "property";
        base = dbp.ns("").value;
    } else {
        return `/resource/page?iri=${encodeURIComponent(strIRI)}`;
    }

    const article = dbpediaToWikiQuery(base, iri);

    return `/${prefix}/${article}`;
}

export function dbpediaToWikiQuery(base, iri: NamedNode | string): string {
    if (!iri || typeof iri !== "string" && iri.termType !== TermType.NamedNode) {
        return "";
    }

    return (typeof iri === "string" ? iri : iri.value)
        .replace(base, "")
        .replace(/_/g, " ");
}

export function retrieveFilename(iri, folder) {
    if (typeof folder === "undefined") {
        const url = new URL(iri.value);
        folder = rdfFactory.namedNode(`${url.origin}${url.pathname.split("/").slice(0, -1).join("/")}`);
    }
    let file = iri.value.replace(folder.value, "");
    // There is some issue in redirection or parsing where paths without trailing slash will cause
    // the embedded files to be root-relative IRI's.
    if (file.includes("://")) {
        file = iri.value.replace(folder.site().value, "");
    }

    return file;
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

    return iri.term || iri.toString();
}
