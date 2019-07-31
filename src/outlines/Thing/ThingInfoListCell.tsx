import { Property } from "link-redux";
import * as React from "react";

import { InfoListCellTopology } from "../../canvasses";
import { Chip } from "../../canvasses/Chip";
import { LDLink } from "../../components/LDLink";
import { ImageProps, NameProps } from "../../helpers/types";

import { ArticleBase } from "./ArticleBase";

/**
 * Renders nested resources which are referred to as values within an info list item (right hand).
 */
export class ThingInfoListCell extends ArticleBase {
    public static topology = InfoListCellTopology;

    public render() {
        return (
            <LDLink>
                <Chip
                    avatar={<Property label={ImageProps}/>}
                    label={<Property label={NameProps}/>}
                />
            </LDLink>
        );
    }
}
