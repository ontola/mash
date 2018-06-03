import LinkedRenderStore, { RENDER_CLASS_NAME } from "link-lib";
import {
    LinkedResourceContainer,
    Property,
    register, SubjectProp,
    Type,
} from "link-redux";
import {
    TableRow,
} from "material-ui";
import { NamedNode } from "rdflib";
import { PureComponent } from "react";
import * as React from "react";
import { ArticleTableCell } from "../canvasses/Article/ArticleTableCell";
import { ArticleTableRow } from "../canvasses/Article/ArticleTableRow";
import { InfoListItem } from "../canvasses/InfoList/InfoListItem";

import {
    ArticleTableCellTopology,
    ArticleTableRowTopology,
    ArticleTableTopology,
    ArticleTopology,
    DataGridCellListItemTopology,
    InfoListTopology,
} from "../canvasses";
import { ArticleLayout } from "../components/ArticleLayout";
import InfoListItemLabel from "../components/InfoListItemLabel";
import LDLink from "../components/LDLink";
import {
    ImageTypes,
    NameTypes,
    TextTypes,
    ThingTypes,
} from "../helpers/types";
import { NS } from "../LRS";
import { Chip } from "../topologies/Chip";

interface LabelProp {
    label: NamedNode;
}

abstract class ArticleBase<T = {}> extends PureComponent<T> {
    public static type = ThingTypes;
}

class ThingArticle extends ArticleBase {
    public static topology = ArticleTopology;

    public render() {
        return (
            <ArticleLayout>
              <Property label={TextTypes}/>
              <Property label={NS.schema("creator")}/>
            </ArticleLayout>
        );
    }
}

class ThingArticleTable extends ArticleBase {
    public static topology = ArticleTableTopology;

    public render() {
        const { cells } = this.props;

        return (
            <TableRow>
                {cells.map((c) => (
                    <ArticleTableCell>
                        <Property label={c} />
                    </ArticleTableCell>
                ))}
            </TableRow>
        );
    }
}

class ThingInfoList extends ArticleBase<LabelProp> {
    public static topology = InfoListTopology;

    public render() {
        const { label } = this.props;

        return (
            <InfoListItem>
                {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
                <Property label={ImageTypes}/>
            </InfoListItem>
        );
    }
}

class ThingInfoListRow extends ArticleBase<LabelProp> {
    public static topology = ArticleTableRowTopology;

    public render() {
        const { label } = this.props;

        return (
            <React.Fragment>
                <ArticleTableCell>
                    {label
                        ? <LinkedResourceContainer subject={label} onError={() => <p>{label.value}</p>} />
                        : null}
                </ArticleTableCell>
                <ArticleTableCell>
                    <Type {...this.props} />
                </ArticleTableCell>
            </React.Fragment>
        );
    }
}

class ThingInfoListItem extends ArticleBase {
    public static topology = ArticleTableCellTopology;

    public render() {
        return (
            <LDLink>
                <Chip
                    avatar={<Property label={ImageTypes} />}
                    label={<Property label={NameTypes} />}
                />
            </LDLink>
        );
    }
}

class ThingTableRowProperty extends ArticleBase<LabelProp> {
    public static property = NS.rdf("predicate");
    public static topology = InfoListTopology;

    public render() {
        const { children, label } = this.props;

        return (
            <ArticleTableRow>
                {label && label.toString()}
                {children}
            </ArticleTableRow>
        );
    }
}

class ThingDataGridCellListItem extends ArticleBase<SubjectProp> {
    public static topology = DataGridCellListItemTopology;

    public render() {
        const { subject } = this.props;

        return <LDLink>{subject.toString()}</LDLink>;
    }
}

export default [
    register(ThingArticle),
    register(ThingArticleTable),
    register(ThingInfoListItem),
    register(ThingInfoListRow),
    register(ThingTableRowProperty),
    register(ThingInfoList),
    register(ThingInfoListItem),
    register(ThingDataGridCellListItem),
];
