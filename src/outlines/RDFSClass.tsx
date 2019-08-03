import * as React from "react";

import { NS } from "../LRS";
import { allTopologies } from "../topologies";

export class RDFSClass extends React.PureComponent<any> {
    public static type = NS.rdfs("Class");

    public static topology = allTopologies;

    public render() {
        return <p>TEST CLASS RENDER {this.props.subject.value}</p>;
    }
}
