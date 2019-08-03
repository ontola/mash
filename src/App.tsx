import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { LinkedResourceContainer, RenderStoreProvider } from "link-redux";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App";
import "./helpers/workarounds";
import { LRS, NS } from "./LRS";

import "./registerComponents";

const Browser = () => {
    const pathname = new URL(window.origin).pathname;

    return (
        <RenderStoreProvider value={LRS} >
          <ThemeProvider theme={createMuiTheme({})}>
            <BrowserRouter basename={pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}>
                <App />
            </BrowserRouter>

            <LinkedResourceContainer subject={NS.ontola("snackbar/manager")} />
            <LinkedResourceContainer subject={NS.ontola("dialog/manager")} />
          </ThemeProvider>
        </RenderStoreProvider>
    );
};

render(
    React.createElement(Browser),
    document.getElementById("root"),
);
