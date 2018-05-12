import { createAction, handleActions } from "redux-actions";

export const NAVIGATE_ARTICLE = "NAVIGATE_ARTICLE";

interface BrowserState {
    currentArticle: string;
}

const initialState: BrowserState = {
    currentArticle: "",
};

export const browser = handleActions<BrowserState, string>({
    [NAVIGATE_ARTICLE]: (state, { payload }) => Object.assign(
        {},
        state,
        {currentArticle: payload},
    ),
}, initialState);

export const getCurrentArticle = (state) => {
    return state.browser.currentArticle;
};
export const setCurrentArticle = createAction<string>(NAVIGATE_ARTICLE);
