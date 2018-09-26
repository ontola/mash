import { ConnectedRouter } from "connected-react-router/immutable";
import { RenderStoreProvider } from "link-redux";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import "./helpers/workarounds";
import { LRS } from "./LRS";
import { configureStore } from "./state";

import "./registerComponents";

const { history, store } = configureStore();

render(
    (
        <Provider store={store}>
            <React.Fragment>
                <RenderStoreProvider value={LRS}>
                    <ConnectedRouter history={history}>
                        <App />
                    </ConnectedRouter>
                </RenderStoreProvider>
            </React.Fragment>
        </Provider>
    ),
    document.getElementById("root"),
);
