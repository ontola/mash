import "../rdfLibFactory";

import rdfFactory, { NamedNode } from "@ontologies/core";
import { type } from "@ontologies/rdf";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from "react-router";
import urlTemplate from "url-template";

import { Browser } from "../App";
import { createLRS } from "../createLRS";
import { Pane } from "../topologies/Pane/Pane";

const template = "{+iriPathname}{+iriSearch}{+iriHash}";
const pathMashlib = {
  expand: urlTemplate.parse(template).expand,
  template,
};

export default {
  name: "mash",

  icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAA2FJREFUSMftlV1oXFUQx39z712ye9doUPxCkcZvrZqCJVZNUBR8kSqtFYugDxYpFrdCuLuhYLIsoln2ZrMRH9RorVWJgRCVSsFCQRDcVF98q9qGZsGE+IEmLu4lyeac8WVT0kZTGn0RHDgvM/+ZHzNnDgf+6ybnIw6CoNVxnEtd153s6+v75V8DZDKZzar6OrC54bLAoXq9vmdwcHDmHwG6u7vbrLVl4A8R6bfWTojIFmAvML20tNReKpV++7t851wAa20RWBSRO62134nIJlV9H3gI2OB53r618tcEZLPZC4D7gf3GmNtF5BDQKyLlWCx2QkRGge3rBlSr1YsAV1WnXNfdtCLUXK/Xb1bVb4Er1w2Ympr6EZgVkS3GmGFguhGq+b7/lYjcAlTWDRgdHTUicgB43HXdNt/3rwd2AclarbbDGJMDetYNALDW9gInVXVsYWHh6jAM3xGRL0TkpcXFxckwDMfWyvf+yplKpS70PK+5VCpNi8gVwDWq+mE+n59oSLqBclNT03PpdHpEVRPJZPKHXC63tGYHmUymOZ1OvxGPx3+OxWJZABF5DZgHgmVdoVA4BnwkIkVgRkRORVH0axAEr6RSqaaVNU8/tGw260VRdBS4GxgQkfeAjao6CuwOw3BoZWJXV9eNrusOicgIsKCq24CtInI4kUg8ksvl7BkdRFH0DHCfqu5S1SHgCVV9FTjm+/7bZ7c+MDBwwvf9B1T1d6DJ9/0nVfVFVX24VqvtXHUHqrodmDDGjHmed1JVr2qM6OVqtdqSTqd3nA2Jouhe4GlVJYqirclk8tEoivYAjwHDZwBE5HJgMhaLXbJcvGE3eJ63AXjzHAt3Ty6XWwqCoNKoteqSK0Db3NzcT8CnDV/NGDMsIg82Vnaj67oXLx/geUAb2gNBECSBO1R1YhVARA4Cl7W0tPRXKpVt1tp2Vb0WSKhqj6oeKRaLx/P5/KwxZqcx5jMR+dhae5u1tn1+fn6fiOwXkaSIvLUKUCgUPgGGVHVva2vrcdd1nxWRDxzH+RyYVdXdy1pr7dfAddba7x3H6XUc54V4PH6qsRg9YRh+uax1Vw6xXC4f7ujomFTVW4FOICEiB621TxWLxdMfy/j4+ExnZ+eIqjaLyF3ATcA3QKq/v/9d/rfzsT8BLSh3EEuAcGsAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMTEtMDRUMDc6MzA6MTgrMDA6MDCpcsQ2AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTExLTA0VDA3OjMwOjE4KzAwOjAw2C98igAAACh0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vdG1wL21hZ2ljay1aQXl1eG83SBfQyAIAAAAASUVORK5CYII=",

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

    if (UI?.store) {
      // TODO: Add hook which touches the store on update without infinite loop
      // Let link-lib know which resources were already fetched by {UI.store}.
      UI.store
        .statements
        .reduce((acc, curr) => acc.includes(curr.subject) ? acc : acc.concat(curr.subject), [])
        .map((s) => lrs.store.touch(s));
    }

    if (UI) {
      UI.lrs = lrs;
    }

    return lrs;
  },

  label(subject) {
    if (typeof this.types !== "undefined") {
      const subjectTypes = this.lrs().getResourceProperties(subject, type);
      if (!subjectTypes.some((tSubject) => this.types.some((tPanel) => rdfFactory.equals(tSubject, tPanel)))) {
        return null;
      }
    }

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

    ReactDOM.unmountComponentAtNode(mountPoint);

    ReactDOM.render(
      <Browser lrs={this.lrs()} template={pathMashlib}>
        <Route
          path="*"
          component={({ location }) => {
            const iri = rdfFactory.namedNode(`${origin}${location.pathname}${location.search}${location.hash}`);

            return (
              <Pane>
                {this.children(iri)}
              </Pane>
            );
          }}
        />
      </Browser>,
      mountPoint,
    );

    return mountPoint;
  },
};
