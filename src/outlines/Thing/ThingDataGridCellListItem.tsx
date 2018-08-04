import { SubjectProp } from "link-redux";
import * as React from "react";

import { DataGridCellListItemTopology } from "../../canvasses";
import LDLink from "../../components/LDLink";

import { ArticleBase } from "./ArticleBase";

export class ThingDataGridCellListItem extends ArticleBase<SubjectProp> {
    public static topology = DataGridCellListItemTopology;

    public render() {
        const { subject } = this.props;

        return <LDLink>{subject.toString()}</LDLink>;
    }
}
