import "./rdfFactory";

import * as React from "react";
import * as ReactDOM from "react-dom";
import urlTemplate from "url-template";

import { Browser } from "./App";
import App from "./components/App";
import { createLRS } from "./createLRS";

const template = "/resource/page?iri={iriProtocol}{iriHost}{iriPathname}{iriSearch}{iriHash}";
const pathMash = {
  expand: urlTemplate.parse(template).expand,
  template,
};

const { lrs } = createLRS({
  applyWorkarounds: true,
  makeGlobal: true,
  workaroundOpts: {
    proxy: true,
  },
});

ReactDOM.render(
  <Browser lrs={lrs} template={pathMash}>
    <App />
  </Browser>,
  document.getElementById("root"),
);
