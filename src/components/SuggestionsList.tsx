import { CircularProgress, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useDebounce } from "use-debounce";

import { useFetch } from "../helpers/hooks/useFetch";
import { LDLink } from "./LDLink";

const useStyles = makeStyles({
  loadingIndicator: {
    margin: "auto",
  },
  loadingListItem: {
    minWidth: "25rem",
  },
  suggestionsList: {
    maxHeight: "40em",
    overflowX: "hidden",
    position: "absolute",
    top: "3em",
    zIndex: 1,
  },
});

const DBPEDA_AUTOCOMPLETE_BASE = "http://dbpedia.org/services/rdf/iriautocomplete.get?lbl=";

function autocompleteProxyUrl(keyword: string) {
  const target = encodeURIComponent(`${DBPEDA_AUTOCOMPLETE_BASE}${keyword}`);

  return `/proxy?iri=${target}`;
}

export const SuggestionsList = ({
  showSuggestions,
  keyword,
  onSelect,
}) => {
  const classes = useStyles({});
  const queuedUrl = showSuggestions ? autocompleteProxyUrl(keyword) : undefined;
  const [ fetchUrl ] = useDebounce(queuedUrl, 200);
  const [ response, loading ] = useFetch(fetchUrl);

  if (!showSuggestions) {
    return null;
  }

  let children;

  if (loading) {
    children = (
      <ListItem className={classes.loadingListItem}>
        <CircularProgress className={classes.loadingIndicator} />
      </ListItem>
    );
  } else {
    const suggestions = response.results.reduce(
      (result, _, index, array) => {
        if (index % 2 === 0) {
          result.push(array.slice(index, index + 2));
        }
        return result;
      },
      [],
    );

    children = suggestions.map(([title, iri]) => (
      <ListItem
        button
        component={LDLink}
        to={iri}
        key={`${title}-${iri}`}
        onClick={onSelect}
      >
        <ListItemText
          primary={title}
          secondary={iri}
        />
      </ListItem>
    ));
  }

  return (
    <Paper className={classes.suggestionsList}>
      <List>
        {children}
      </List>
    </Paper>
  );
};
