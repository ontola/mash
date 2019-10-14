import "../rdfLibFactory";

import rdfFactory, { NamedNode } from "@ontologies/core";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from "react-router";
import template from "url-template";

import { Browser } from "../App";
import { createLRS } from "../createLRS";

const pathMashlib = template.parse("{+iriPathname}");

export default {
  name: "mash",

  icon: "/public/football-helmet.svg",

  lrs() {
    const UI = (window as any).UI;
    if (UI?.lrs) {
      return UI.lrs;
    }

    const { lrs } = createLRS({
      applyWorkarounds: true,
      makeGlobal: true,
      rdfStoreOpts: {
        innerStore: UI?.store,
      },
      workaroundOpts: {
        proxy: false,
      },
    });

    if (UI) {
      UI.lrs = lrs;
    }

    return lrs;
  },

  label() {
    return this.name;
  },

  children(subject: NamedNode) {
    return (
      <LinkedResourceContainer subject={subject} />
    );
  },

  render(subject: NamedNode, dom: Document) {
    const origin = new URL(subject.value).origin;
    const mountPoint = dom.createElement("div");

    ReactDOM.render(
      <Browser lrs={this.lrs()} template={pathMashlib}>
        <Route
          path="*"
          component={({ location }) => {
            const iri = rdfFactory.namedNode(`${origin}${location.pathname}${location.search}${location.hash}`);

            return this.children(iri);
          }}
        />
      </Browser>,
      mountPoint,
    );

    return mountPoint;
  },
};
