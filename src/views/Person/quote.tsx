import { Typography } from "@material-ui/core";
import { Literal, NamedNode } from "rdflib";
import * as React from "react";

import { ArticleTopology } from "../../canvasses";
import { PersonTypes } from "../../helpers/types";
import { NS } from "../../LRS";

interface PropTypes {
    label: NamedNode;
    prop: Literal[];
}

export class QuoteArticle extends React.PureComponent<PropTypes> {
    public static type = PersonTypes;

    public static property = NS.dbp("quote");

    public static topology = ArticleTopology;

    public static mapDataToProps = {
        prop: {
            label: NS.dbp("quote"),
            limit: Infinity,
        },
    };

    public render() {
        const { label, prop } = this.props;

        return (
            <React.Fragment>
                <Typography variant="display1">{label.term}</Typography>
                {prop
                    .filter((s) => s.datatype.value === NS.rdf("langString").value)
                    .map((s) => <Typography key={s.value} variant="caption">{s.value}</Typography>)}
            </React.Fragment>
        );
    }
}
