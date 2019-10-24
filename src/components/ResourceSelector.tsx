import { Button, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import Downshift from "downshift";
import { useLRS } from "link-redux";
import * as React from "react";

export const ResourceSelector = ({ children, classes, onChange, type }) => {
  const lrs = useLRS();
  const items = (lrs as any)
    .store
    .match(null, null, type)
    .map((s) => ({ value: s.subject }));

  return (
    <Downshift
      initialIsOpen={false}
      onChange={onChange}
      itemToString={(item) => (item ? item.value.value : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div className={classes.container}>
          {children(getInputProps())}
          <Paper {...getMenuProps()} className={classes.dropdown}>
            <List>
              {isOpen
                ? items
                  .filter((item) => !inputValue || item.value.value.includes(inputValue))
                  .map((item, index) => (
                    <ListItem
                      component={Button}
                      {...getItemProps({
                        index,
                        item,
                        key: item.value.value,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        },
                      })}
                    >
                      <ListItemText primary={item.value.value} />
                    </ListItem>
                  ))
                : null}
            </List>
          </Paper>
        </div>
      )}
    </Downshift>
  );
};
