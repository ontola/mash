import "./rdfFactory";

import importToArray from "import-to-array";
import * as LinkLib from "link-lib";
import * as React from "react";
import * as ReactDOM from "react-dom";
import urlTemplate from "url-template";

import { Browser } from "./App";
import App from "./components/App";
import { createLRS } from "./createLRS";
import * as outlines from "./outlines";
import * as views from "./views";

const template = "/resource/page?iri={iriProtocol}{iriHost}{iriPathname}{iriSearch}{iriHash}";
const pathMash = {
  expand: urlTemplate.parse(template).expand,
  template,
};

const renderers = [
  ...importToArray<string, React.ElementType<any>>(outlines),
  ...importToArray<string, React.ElementType<any> | LinkLib.ComponentRegistration<React.ElementType<any>>>(views),
];

const { lrs } = createLRS({
  applyWorkarounds: true,
  makeGlobal: true,
  views: renderers,
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
