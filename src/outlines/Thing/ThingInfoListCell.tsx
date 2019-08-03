import { Property } from "link-redux";
import * as React from "react";

import { LDLink } from "../../components/LDLink";
import { ImageProps, NameProps } from "../../helpers/types";
import { InfoListCellTopology, InfoListItemTopology, InfoListSectionTopology } from "../../topologies";
import { Chip } from "../../topologies/Chip";

import { ArticleBase } from "./ArticleBase";

/**
 * Renders nested resources which are referred to as values within an info list item (right hand).
 */
export class ThingInfoListCell extends ArticleBase {
  public static topology = [
    InfoListCellTopology,
    InfoListItemTopology,
    InfoListSectionTopology,
  ];

  public render() {
    return (
      <LDLink>
        <Chip
          style={{ cursor: "pointer" }}
          avatar={<Property label={ImageProps} />}
          label={<Property label={NameProps} />}
        />
      </LDLink>
    );
  }
}
