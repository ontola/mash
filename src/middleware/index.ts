import { MiddlewareFn } from "link-lib";
import { ReactType } from "react";

export const middleware: Array<MiddlewareFn<ReactType>> = [
    () => (next) => (a, o) => {
        // tslint:disable-next-line no-console
        console.log(`action: ${a.value}`, o);

        return next(a, o);
    },
];
