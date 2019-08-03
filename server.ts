/* tslint:disable no-console */
import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as proxy from "http-proxy-middleware";
import { URL } from "whatwg-url";

import { FRONTEND_URL, PORT } from "./src/helpers/config";

const app = express();

function isWikiData(url) {
    return url.startsWith("https://www.wikidata.org/") || url.startsWith("http://www.wikidata.org/");
}

export const dataProxy = proxy({
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        if (isWikiData(req.url) && req.headers.Accept !== "text/n3") {
            proxyReq.setHeader("Accept", "text/n3");
        }
        // proxyReq.setHeader("X-Forwarded-Proto", "https");
    },
    onProxyRes: (proxyRes) => {
        const loc = proxyRes.headers.location;
        if ([301, 302, 303, 307, 308].includes(proxyRes.statusCode) && loc) {
            proxyRes.headers.location = `${FRONTEND_URL}proxy?iri=${encodeURIComponent(loc)}`;
        }
        delete proxyRes.headers["strict-transport-security"];
        delete proxyRes.headers["access-control-allow-origin"];
    },
    pathRewrite: (reqPath) => {
        const iri = new URL(reqPath, "http://example.com").searchParams.get("iri");
        const url = new URL(decodeURIComponent(iri));

        return url.toString().slice(url.origin.length);
    },
    router: (req: http.IncomingMessage) => {
        const iri = new URL(req.url, "http://example.com").searchParams.get("iri");
        const url = decodeURIComponent(iri);
        if (url.startsWith("http://dbpedia.org/")) {
            return "http://dbpedia.org";
        } else if (isWikiData(url)) {
            return "https://www.wikidata.org";
        } else if (url.startsWith("https://argu.co/")) {
            return "https://argu.co";
        } else if (url.startsWith("http://umbel.org/")) {
            return "http://umbel.org";
        }

        return new URL(url).origin;
        // throw new Error("Domain not whitelisted for poxy (contact us to get whitelisted)");
    },
    target: "http://dbpedia.org/",
    xfwd: false,
    logLevel: "debug",
});

app.use(express.static(__dirname + "/dist"));

app.get("/proxy", dataProxy);

app.get("*", (_request, response) => {
    response.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT);

console.log(`Listening to ${PORT}`);
