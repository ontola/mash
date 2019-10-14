import { createMuiTheme } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import { LinkedResourceContainer, RenderStoreProvider } from "link-redux";
import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { TemplateContext } from "./helpers/templateContext";
import ontola from "./ontology/ontola";

export const Browser = ({
  children,
  template,
  lrs,
}) => {
    const pathname = new URL(window.origin).pathname;

    console.log("BROWSER BOOT", lrs, template);

    return (
        <RenderStoreProvider value={lrs} >
          <TemplateContext.Provider value={template}>
            <ThemeProvider theme={createMuiTheme({ palette: { primary: deepPurple } })}>
              <BrowserRouter basename={pathname.endsWith("/") ? pathname.slice(0, -1) : pathname}>
                {children}
              </BrowserRouter>

              <LinkedResourceContainer subject={ontola.ns("snackbar/manager")} />
              <LinkedResourceContainer subject={ontola.ns("dialog/manager")} />
            </ThemeProvider>
          </TemplateContext.Provider>
        </RenderStoreProvider>
    );
};
