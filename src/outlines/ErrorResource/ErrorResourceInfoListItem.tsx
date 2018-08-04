import { Icon } from "@material-ui/core";
import * as React from "react";
import { ArticleTableCellTopology, InfoListItemTopology } from "../../canvasses";

import { Chip } from "../../canvasses/Chip";
import LDLink from "../../components/LDLink";
import { NS } from "../../LRS";

export class ErrorResourceInfoListItem extends React.PureComponent {
    public static type = NS.ll("ErrorResource");
    public static topology = [
        ArticleTableCellTopology,
        InfoListItemTopology,
    ];

    public render() {
        return (
            <LDLink>
                <Chip
                    avatar={<Icon>cross</Icon>}
                />
            </LDLink>
        );
    }
}
