import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import rdfFactory from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { useLRS } from "link-redux";
import * as React from "react";
import { Field, Form } from "react-final-form";
import ll from "../ontology/ll";

import { ResourceSelector } from "./ResourceSelector";

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    position: "relative",
  },
  dropdown: {
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});

export const PropertyInput = ({ className, graph, subject }) => {
  const lrs = useLRS();
  const classes = useStyles({});
  const formId = `form.${graph.value}.${subject.value}`;

  const submitHandler = (values, form) => {
    try {
      const predicate = new URL(values.predicate).toString();

      return lrs.processDelta([
        [
          rdfFactory.namedNode(values.subject),
          rdfFactory.namedNode(predicate),
          values.object.indexOf(":") > 0 && values.object.indexOf(" ") < 0
            ? rdfFactory.namedNode(values.object)
            : rdfFactory.blankNode(values.object),
          rdfFactory.namedNode(ll.ns(`${values.button || "add"}?graph=${encodeURIComponent(values.graph)}`)),
        ],
      ]).then(() => {
        setTimeout(() => form.reset({
          graph: graph.value,
          subject: subject.value,
        }));
      });
    } catch (e) {
      lrs.actions.ontola.showSnackbar("The predicate must be a valid IRI");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      render={({ form, handleSubmit }) => (
        <form
          action="#"
          className={className}
          id={formId}
          onSubmit={handleSubmit}
        >
          <Field
            name="subject"
            initialValue={subject.value}
            type="hidden"
            render={({ input }) => (
              <TextField
                {...input}
                inputProps={input}
                variant="outlined"
              />
            )}
          />
        <Field
          name="graph"
          type="hidden"
          initialValue={graph.value}
          render={({ input }) => (
            <TextField
              {...input}
              inputProps={input}
              variant="outlined"
            />
          )}
        />
        <Grid container spacing={1} xs={12}>
          <Grid container item xs={12}>
            <Grid item xs={3}>
              <Field
                name="predicate"
                render={({ input }) => (
                  <ResourceSelector
                    classes={classes}
                    onChange={input.onChange}
                    type={rdf.Property}
                  >
                    {(inputProps) => (
                      <TextField
                        {...input}
                        {...inputProps}
                        inputProps={{
                          ...input,
                          ...inputProps,
                          form: formId,
                        }}
                        label="Predicate"
                        type="url"
                        variant="outlined"
                      />
                    )}
                  </ResourceSelector>
                )}
              />
            </Grid>
            <Grid item xs={9}>
              <Field
                name="object"
                render={({ input }) => (
                  <TextField
                    {...input}
                    inputProps={{
                      ...input,
                      form: formId,
                    }}
                    label="Object"
                    type="text"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {["add", "replace", "slice", "remove", "supplant"].map((operation, i) => (
              <Button
                type="submit"
                key={operation}
                value={operation}
                variant={i === 0 ? "contained" : "outlined"}
                onClick={(e) => { form.change("button", e.currentTarget.value); }}
              >
                {operation}
              </Button>
            ))}
          </Grid>
        </Grid>
      </form>
      )}
    />
  );
};
