import { Card } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { TermType } from "@ontologies/core";
import { LinkedResourceContainer } from "link-redux";
import * as React from "react";

import { resourceToWikiPath } from "../../helpers/iris";
import { TemplateContext } from "../../helpers/templateContext";
import { DescriptionProps, ImageProps, NameProps, ThingTypes } from "../../helpers/types";
import { DialogTopology } from "../../topologies";

const useStyles = makeStyles({
  image: {
    maxHeight: "20rem",
  },
});

export const ThingDialog = ({
  description,
  subject,
  image,
  name,
}) => {
  const template = React.useContext(TemplateContext);
  const classes = useStyles({});

  const media = image && (image.termType === TermType.Literal
    ? <CardMedia className={classes.image} image={image && image.value} />
    : <LinkedResourceContainer className={classes.image} subject={image} />);

  return (
    <Card>
      <CardActionArea href={resourceToWikiPath(subject, template)}>
        {media}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name.value}
          </Typography>
          {description && (
            <Typography color="textSecondary" component="p">
              {description.value}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ThingDialog.type = ThingTypes;

ThingDialog.topology = DialogTopology;

ThingDialog.mapDataToProps = {
  description: DescriptionProps,
  image: ImageProps,
  name: NameProps,
};
