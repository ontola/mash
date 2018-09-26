import * as React from "react";

import { allTopologies } from "../canvasses";
import { NS } from "../LRS";

export class RDFSClass extends React.PureComponent<any> {
    public static type = NS.rdfs("Class");

    public static topology = allTopologies;

    public render() {
        return <p>TEST CLASS RENDER {this.props.subject.value}</p>;
    }
}
