import { RENDER_CLASS_NAME } from "link-lib";
import { useLinkRenderContext, useLRS } from "link-redux";
import { NamedNode, Node, Term } from "rdflib";
import { ComponentType } from "react";
import * as React from "react";

import { NS } from "../LRS";

export const TypeCollector = () => {
    const lrs = useLRS();
    const { subject, topology } = useLinkRenderContext();

    const property = RENDER_CLASS_NAME.sI;
    const declaredTypes = lrs.getResourceProperties(subject, NS.rdf("type")).map((s) => (s as NamedNode).sI);
    const types = (lrs as any).schema.expand(declaredTypes)
      .map((sI) => NamedNode.findByStoreIndex(sI))
      .filter((node) => Object.prototype.hasOwnProperty.call(node, "sI"))
      .map((type: Node) => {
          if (type.termType === "Collection") {
              throw new Error("Can't map collection to type");
          }

          return (lrs as any).mapping.getRenderComponent(
            [(type as Term).sI],
            [property],
            topology.sI,
            NS.app("no-view").sI,
          );
      })
      .filter((v) => typeof v !== "undefined");
    const uniqueComponents = Array.from<ComponentType>(new Set(types));

    return (
      <React.Fragment>
          {uniqueComponents.map((Comp) => <Comp />)}
      </React.Fragment>
    );
};
