import { MiddlewareFn } from "link-lib";
import { ElementType } from "react";

import { History } from "../helpers/history";

import { browserMiddleware } from "./browser";
import execFilter from "./execFilter";
import { logging } from "./logging";
import { ontolaMiddleware } from "./ontolaMiddleware";

export const createMiddleware = (history: History): Array<MiddlewareFn<ElementType>> => [
    logging,
    ontolaMiddleware(history),
    browserMiddleware,
    execFilter(),
];
