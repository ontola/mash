import { RenderStoreProvider } from "link-redux";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import "./helpers/workarounds";
import { LRS } from "./LRS";

import "./registerComponents";

const TodoApp = () => {
    const pathname = new URL(window.origin).pathname;

    return (
        <RenderStoreProvider value={LRS} >
            <BrowserRouter basename={pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}>
                <App />
            </BrowserRouter>
        </RenderStoreProvider>
    );
};

render(
    React.createElement(TodoApp),
    document.getElementById("root"),
);
