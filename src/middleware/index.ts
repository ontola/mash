import { MiddlewareFn } from "link-lib";
import { ElementType } from "react";

import { History } from "../helpers/history";

import { browserMiddleware } from "./browser";
import execFilter from "./execFilter";
import { loggingMiddleware } from "./loggingMiddleware";
import { ontolaMiddleware } from "./ontolaMiddleware";
import { solidMiddleware } from "./solid";

export const createMiddleware = (history: History, externals = []): Array<MiddlewareFn<ElementType>> => [
    loggingMiddleware,
    ontolaMiddleware(history),
    solidMiddleware,
    browserMiddleware,
    ...externals,
    execFilter(),
];
