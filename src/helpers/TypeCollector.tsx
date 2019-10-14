import rdfFactory, { Node, Term } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { RENDER_CLASS_NAME } from "link-lib";
import { useLinkRenderContext, useLRS } from "link-redux";
import { ComponentType } from "react";
import * as React from "react";

import app from "../ontology/app";

export const TypeCollector = () => {
    const lrs = useLRS();
    const { subject, topology } = useLinkRenderContext();

    const property = rdfFactory.id(RENDER_CLASS_NAME);
    const declaredTypes = lrs.getResourceProperties(subject, rdf.type).map((s) => rdfFactory.id(s));
    const types = (lrs as any).schema.expand(declaredTypes)
      .map((id) => rdfFactory.fromId(id))
      .filter((node) => Object.prototype.hasOwnProperty.call(node, "id"))
      .map((type: Node) => {
          if ((type as any).termType === "Collection") {
              throw new Error("Can't map collection to type");
          }

          return (lrs as any).mapping.getRenderComponent(
            [(type as Term).id],
            [property],
            topology.id,
            app.ns("no-view").id,
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
