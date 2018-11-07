import { connectRouter, routerMiddleware } from "connected-react-router";
import createHistory from "history/createBrowserHistory";
import { linkMiddleware, linkReducer } from "link-redux";
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

import { LRS } from "../LRS";
import { browser } from "./browser";

const reducers = (history) => combineReducers({
    browser,
    linkedObjects: linkReducer,
    router: connectRouter(history),
});

export const configureStore = () => {
    const history = createHistory();
    const store = createStore(
        reducers(history),
        composeWithDevTools(applyMiddleware(
            linkMiddleware(LRS),
            routerMiddleware(history),
            apiMiddleware,
        )),
    );

    return {
        history,
        store,
    };
};
