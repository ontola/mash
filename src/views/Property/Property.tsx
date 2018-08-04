import * as React from "react";

import { allTopologies } from "../../canvasses";
import { NameTypes, PropertyTypes } from "../../helpers/types";

class Property extends React.PureComponent {
    public static mapDataToProps = {
        name: {
            label: NameTypes,
        },
    };
    public static linkOpts = {
        forceRender: true,
        returnType: "value",
    };
    public static type = PropertyTypes;
    public static topology = allTopologies;

    public render() {
        return (
            <React.Fragment>
                {name ? name : "Unknown"}
            </React.Fragment>
        );
    }
}
export default Property;
