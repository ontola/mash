import createHistory from "history/createBrowserHistory";
import { linkMiddleware, linkReducer } from "link-redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import {
    applyMiddleware,
    combineReducers,
    createStore,
} from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

import { LRS } from "../LRS";
import { browser } from "./browser";

const reducers = {
    browser,
    linkedObjects: linkReducer,
    router: routerReducer,
};

export const configureStore = () => {
    const history = createHistory();
    const store = createStore(
        combineReducers(reducers),
        composeWithDevTools(applyMiddleware(linkMiddleware(LRS), routerMiddleware(history), apiMiddleware)),
    );

    return {
        history,
        store,
    };
};
