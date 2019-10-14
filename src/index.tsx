import "./rdfFactory";

import * as React from "react";
import { render } from "react-dom";
import template from "url-template";

import { Browser } from "./App";
import App from "./components/App";
import { createLRS } from "./createLRS";

const pathMash = template.parse("/resource/page?iri={origin}{path}");

const { lrs } = createLRS({
  applyWorkarounds: true,
  makeGlobal: true,
  workaroundOpts: {
    proxy: true,
  },
});

render(
  <Browser lrs={lrs} template={pathMash}>
    <App />
  </Browser>,
  document.getElementById("root"),
);
