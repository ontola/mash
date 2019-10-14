import * as React from "react";
import { render } from "react-dom";

import { Browser } from "./App";
import App from "./components/App";

render(
  React.createElement(Browser, null, React.createElement(App)),
  document.getElementById("root"),
);
