import { LOCATION_CHANGE } from "connected-react-router";
import { createAction, handleActions } from "redux-actions";

export const NAVIGATE_ARTICLE = "NAVIGATE_ARTICLE";

export interface BrowserState {
    currentArticle: string;
    showSuggestions: boolean;
    suggestions: string[][];
}

const initialState: BrowserState = {
    currentArticle: "",
    showSuggestions: false,
    suggestions: [],
};

export const browser = handleActions<BrowserState, string | any>({
    ["SUCCESS"]: (state, { payload }) => {
        const suggestions = payload.results.reduce((acc, elem, i) => {
            if (i % 2 === 0) {
                acc.push([elem]);
            } else {
                acc[acc.length - 1][1] = elem;
            }
            return acc;
        }, []);
        return Object.assign({}, state, { showSuggestions: true, suggestions });
    },
    [LOCATION_CHANGE]: (state) => Object.assign(
    {},
    state,
    { showSuggestions: false },
    ),
    [NAVIGATE_ARTICLE]: (state, { payload }) => Object.assign(
        {},
        state,
        {currentArticle: payload, showSuggestions: false},
    ),
}, initialState);

export const getCurrentArticle = (state) => {
    return state.browser.currentArticle;
};
export const setCurrentArticle = createAction<string>(NAVIGATE_ARTICLE);
