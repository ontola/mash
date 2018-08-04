import { PureComponent } from "react";

import { ThingTypes } from "../../helpers/types";

export abstract class ArticleBase<T = {}> extends PureComponent<T> {
    public static type = ThingTypes;
}
