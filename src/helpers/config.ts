function tryEnv(varName: string, production: string, fallback: string): string | undefined {
    if (typeof process !== "undefined" && typeof process.env !== "undefined") {
        return process.env[varName.toUpperCase()] || process.env.NODE_ENV === "production" ? production : fallback;
    }

    return fallback;
}

export const FRONTEND_HOSTNAME = tryEnv("FRONTEND_HOSTNAME", "link-dbpedia.herokuapp.com", "localhost:8080");
export const FRONTEND_PATH_PREFIX = tryEnv("FRONTEND_PATH_PREFIX", "", "");
const feURL = `https://${FRONTEND_HOSTNAME}${FRONTEND_PATH_PREFIX}/`;
export const FRONTEND_URL = tryEnv("FRONTEND_URL", feURL, feURL);
