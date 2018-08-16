function tryEnv(varName: string, production: string, development: string): string | undefined {
    if (typeof process !== "undefined" && typeof process.env !== "undefined") {
        return process.env[varName.toUpperCase()] || process.env.NODE_ENV === "production" ? production : development;
    }

    return production;
}

export const FRONTEND_HOSTNAME = tryEnv("FRONTEND_HOSTNAME", "link-dbpedia.herokuapp.com", "localhost:8080");
export const FRONTEND_PATH_PREFIX = tryEnv("FRONTEND_PATH_PREFIX", "", "");
export const USE_HTTP = tryEnv("USE_HTTP", "true", "false");
const feURL = `http${USE_HTTP === "false" ? "" : "s"}://${FRONTEND_HOSTNAME}${FRONTEND_PATH_PREFIX}/`;
export const FRONTEND_URL = tryEnv("FRONTEND_URL", feURL, feURL);
export const PORT = process.env.PORT || 8080;
