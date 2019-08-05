import { MiddlewareFn } from "link-lib";
import { ElementType } from "react";

import { History } from "../helpers/history";

import { browserMiddleware } from "./browser";
import execFilter from "./execFilter";
import { logging } from "./logging";
import { ontolaMiddleware } from "./ontolaMiddleware";
import { solidMiddleware } from "./solid";

export const createMiddleware = (history: History, externals = []): Array<MiddlewareFn<ElementType>> => [
    logging,
    ontolaMiddleware(history),
    solidMiddleware,
    browserMiddleware,
    ...externals,
    execFilter(),
];
