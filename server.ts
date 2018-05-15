/* tslint:disable no-console */
import * as express from "express";
import * as proxy from "http-proxy-middleware";
import * as path from "path";
import { URL } from "whatwg-url";

import { FRONTEND_URL, PORT } from "./src/helpers/config";

const PATH_CUTOFF = "http://dbpedia.org".length;

const app = express();

export const dbpediaProxy = proxy({
    changeOrigin: true,
    onProxyRes: (proxyRes) => {
        const loc = proxyRes.headers.location;
        if ([301, 302, 307, 308].includes(proxyRes.statusCode) && loc && loc.startsWith("http://dbpedia.org")) {
            proxyRes.headers.location = `${FRONTEND_URL}proxy?iri=${encodeURIComponent(loc)}`;
        }
    },
    pathRewrite: (reqPath) => {
        const iri = new URL(reqPath, "http://example.com").searchParams.get("iri");
        const url = decodeURIComponent(iri);
        if (!url.startsWith("http://dbpedia.org/")) {
            throw new Error();
        }
        return url.slice(PATH_CUTOFF);
    },
    target: "http://dbpedia.org/",
    xfwd: true,
});

app.use(express.static(__dirname + "/dist"));

app.get("/proxy", dbpediaProxy);

app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT);

console.log(`Listening to ${PORT}`);
