import { LRS } from "../LRS";

// @ts-ignore TS-2341
LRS.api.setAcceptForHost("http://dbpedia.org", "text/turtle");
// @ts-ignore
LRS.api.setAcceptForHost("http://www.wikidata.org/", "text/turtle");
// @ts-ignore
LRS.api.setAcceptForHost("https://www.wikidata.org/", "text/turtle");
// @ts-ignore
LRS.api.setAcceptForHost("https://argu.co/", "application/n-quads");

/* Just run everything through the proxy, should drastically reduce the bug surface */
// @ts-ignore
(LRS.api as any).processor.fetcher.constructor.proxyIfNecessary = (uri) => {
    return LRS
        // @ts-ignore
        .api
        .processor
        .fetcher
        .constructor
        .crossSiteProxyTemplate
        .replace("{uri}", encodeURIComponent(uri));
};
