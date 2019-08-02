import CssBaseline from "@material-ui/core/CssBaseline";
import * as React from "react";
import { Route, Switch, withRouter } from "react-router";

import { Browser } from "./Browser";
import { BrowserPage } from "./BrowserPage";
import { HomePage } from "./HomePage";

const App = withRouter(() => (
    <React.Fragment>
        <CssBaseline />
        <Browser>
            <Switch>
                <Route path="/wiki/:article/:view(page|data)?" component={BrowserPage} />
                <Route path="/property/:article/:view(page|data)?" component={BrowserPage} />
                <Route path="/ontology/:article/:view(page|data)?" component={BrowserPage} />
                <Route path="/resource/:view(page|data|iframe)?" component={BrowserPage} />
                <Route path="/" component={HomePage} />
                <Route path="*" component={BrowserPage} />
            </Switch>
        </Browser>
    </React.Fragment>
));

export default App;
