import { WithStyles, withStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/core/styles";
import rdfFactory from "@ontologies/core";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

const styles = {
    imageContainer: {
        // alignItems: "flex-start",
        // display: "flex",
        maxWidth: "100%;",
        textAlign: "center",
        width: "100%;",
    },
    media: {
        backgroundSize: "100% auto",
        margin: "auto",
        maxHeight: "300px",
        maxWidth: "inherit",
        padding: 0,
        width: "auto",
    },
} as StyleRules;

interface PropTypes extends WithStyles<any> {
    image: string;
}

class CardMediaContainComp extends React.PureComponent<PropTypes> {
    public render() {
        const { classes, image } = this.props;

        return (
            <div className={classes.imageContainer}>
                <LinkedResourceContainer
                    className={classes.media}
                    subject={rdfFactory.namedNode(image)}
                />
            </div>
        );
    }
}

export const MediaContain = withStyles(styles)(CardMediaContainComp);
