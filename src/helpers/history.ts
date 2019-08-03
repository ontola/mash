import { createBrowserHistory, createMemoryHistory, History } from "history";

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

export const history = isBrowser() ? createBrowserHistory() : createMemoryHistory();

export { History };
