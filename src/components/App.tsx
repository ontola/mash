import CssBaseline from "material-ui/CssBaseline";
import * as React from "react";
import { Route, Switch, withRouter } from "react-router";

import Browser from "./Browser";

const App = withRouter(() => (
    <React.Fragment>
        <CssBaseline />
        <Switch>
            <Route path="/wiki/:article/:view(page|data)?" component={Browser} />
            <Route path="/property/:article/:view(page|data)?" component={Browser} />
            <Route path="/ontology/:article/:view(page|data)?" component={Browser} />
            <Route path="/" component={Browser} />
            <Route path="*" component={Browser} />
        </Switch>
    </React.Fragment>
));

export default App;
