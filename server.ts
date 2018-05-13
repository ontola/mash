/* tslint:disable no-console */
import * as express from "express";
import * as proxy from "http-proxy-middleware";
import * as path from "path";
import { URL } from "whatwg-url";

const app = express();

export const dbpediaProxy = proxy({
    pathRewrite: (reqPath) => {
        const iri = new URL(reqPath, "http://example.com").searchParams.get("iri");
        const url = decodeURI(iri);
        if (!url.startsWith("http://dbpedia.org/")) {
            throw new Error();
        }
        return url;
    },
    target: "http://dbpedia.org/",
    xfwd: true,
});

app.use(express.static(__dirname + "/dist"));

app.get("/proxy", dbpediaProxy);

app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(process.env.PORT);

console.log(`Listening to ${process.env.PORT}`);
