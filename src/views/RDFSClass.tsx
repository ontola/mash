import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import * as React from "react";

import { NS } from "../LRS";
import { allTopologies } from "../topologies";

const RDFSClass = ({ subject }) => (
    <p>TEST CLASS RENDER {subject.value}</p>
);

export default [
    LinkedRenderStore.registerRenderer(
        RDFSClass,
        NS.rdfs("Class"),
        RENDER_CLASS_NAME,
        allTopologies,
    ),
];
