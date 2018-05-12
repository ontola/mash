import { WordWrapProperty } from "csstype";
import LinkedRenderStore from "link-lib";
import { link, LinkedResourceContainer } from "link-redux";
import { PropertyPropTypes } from "link-redux/dist/typings/react/components/Property";
import { Typography, withStyles } from "material-ui";
import * as React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import InfoListItemLabel from "../../components/InfoListItemLabel";
import InfoListItemText from "../../components/InfoListItemText";
import { MediaContain } from "../../components/MediaContain";
import { dbpediaToWikiPath } from "../../helpers/iris";
import {
    NameTypes,
    TextTypes,
    ThingTypes,
} from "../../helpers/types";
import { NS } from "../../LRS";
import {
    allTopologiesExcept,
    ArticleTopology,
    ChipTopology,
    InfoListTopology,
} from "../../topologies";
import { InfoListItem } from "../../topologies/InfoListItem";

const styles = {
    chip: {
        maxWidth: 100,
    },
    header: {
        wordWrap: "break-word" as WordWrapProperty,
    },
};

const ThingName = ({ classes, linkedProp }) => (
    <Typography
        className={classes.header}
        color="inherit"
        variant="display4"
    >
        {linkedProp.value}
    </Typography>
);

const ThingNameInfoList = ({ linkedProp }) => (
    <InfoListItem>
        <Typography paragraph color="inherit" variant="title">{linkedProp.value}</Typography>
    </InfoListItem>
);

const ThingNameChip = ({ classes, linkedProp }) => (
    <Typography
        noWrap
        className={classes.chip}
        color="inherit"
        title={linkedProp.value}
        variant="body1"
    >
        {linkedProp.value}
    </Typography>
);

const ThingTextArticle = ({ linkedProp }) => (
    <Typography>{linkedProp.value}</Typography>
);

const ThingWikiPageRedirects = ({ linkedProp }) => (
    <LinkedResourceContainer subject={linkedProp} />
);

interface ThingWikiPageRedirectsArticleProps extends PropertyPropTypes {
    followRedirect: (e) => void;
}
class ThingWikiPageRedirectsArticle extends React.PureComponent<any & ThingWikiPageRedirectsArticleProps> {
    public componentDidMount() {
        this.props.followRedirect(this.props.linkedProp);
    }
    public render() {
        return null;
    }
}

const GenericInfoListProp = ({ label, linkedProp }) => (
    <InfoListItem>
        {label ? <InfoListItemLabel>{label.term}</InfoListItemLabel> : null}
        {linkedProp.termType === "Literal"
            ? <InfoListItemText>{linkedProp.value}</InfoListItemText>
            : <InfoListItemText><LinkedResourceContainer subject={linkedProp} /></InfoListItemText>}
    </InfoListItem>
);

const ImageMapInfoListProp = ({ imageMap, mapCaption }) => (
    <InfoListItem style={{ flexDirection: "column" }}>
        <MediaContain
            image={`http://commons.wikimedia.org/wiki/Special:FilePath/${imageMap.value}`}
        />
        <Typography variant="caption">{mapCaption.value}</Typography>
    </InfoListItem>
);

export default [
    LinkedRenderStore.registerRenderer(
        withStyles(styles)(ThingName),
        ThingTypes,
        NameTypes,
    ),
    LinkedRenderStore.registerRenderer(
        ThingNameInfoList,
        ThingTypes,
        NameTypes,
        InfoListTopology,
    ),
    LinkedRenderStore.registerRenderer(
        GenericInfoListProp,
        ThingTypes,
        [
            NS.foaf("gender"),
            NS.dbp("totalgoals"),
            NS.dbo("Person/height"),
            NS.dbo("motto"),
            NS.foaf("nick"),
        ],
        InfoListTopology,
    ),
    LinkedRenderStore.registerRenderer(
        link([NS.dbp("imageMap"), NS.dbp("mapCaption")])(ImageMapInfoListProp),
        ThingTypes,
        NS.dbp("imageMap"),
        InfoListTopology,
    ),
    LinkedRenderStore.registerRenderer(
        withStyles(styles)(ThingNameChip),
        ThingTypes,
        NameTypes,
        ChipTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ThingTextArticle,
        ThingTypes,
        TextTypes,
        ArticleTopology,
    ),
    LinkedRenderStore.registerRenderer(
        ThingWikiPageRedirects,
        ThingTypes,
        NS.dbo("wikiPageRedirects"),
        allTopologiesExcept(undefined),
    ),
    LinkedRenderStore.registerRenderer(
        connect(
            null,
            (dispatch) => ({
                followRedirect: (p) => dispatch(push(dbpediaToWikiPath(p))),
            }),
        )(ThingWikiPageRedirectsArticle),
        ThingTypes,
        NS.dbo("wikiPageRedirects"),
    ),
];
