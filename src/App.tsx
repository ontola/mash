import { createMuiTheme } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import { LinkedResourceContainer, RenderStoreProvider } from "link-redux";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import "./helpers/workarounds";
import { LRS } from "./LRS";

import ns from "./ns";
import "./registerComponents";

export const Browser = ({ children }) => {
    const pathname = new URL(window.origin).pathname;

    return (
        <RenderStoreProvider value={LRS} >
          <ThemeProvider theme={createMuiTheme({ palette: { primary: deepPurple } })}>
            <BrowserRouter basename={pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}>
              {children}
            </BrowserRouter>

            <LinkedResourceContainer subject={ns.ontola("snackbar/manager")} />
            <LinkedResourceContainer subject={ns.ontola("dialog/manager")} />
          </ThemeProvider>
        </RenderStoreProvider>
    );
};
