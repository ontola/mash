import importToArray from "import-to-array";
import { register, RegistrableComponent } from "link-redux";
import { LRS } from "./LRS";

import * as outlines from "./outlines/index";
import * as views from "./views/index";

const renderers = [...importToArray(outlines), ...importToArray(views)];

LRS.registerAll(
    ...renderers.map((imp: RegistrableComponent<any>) => {
        if (imp) {
            return register(imp);
        }

        return undefined;
    }),
);
