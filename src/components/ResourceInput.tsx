import { Button, TextField, Tooltip, Typography } from "@material-ui/core";
import { useLRS } from "link-redux";
import { NamedNode, Quadruple } from "rdflib";
import * as React from "react";
import { Field, Form } from "react-final-form";

import { addGraph } from "../helpers/delta";
import { NS } from "../LRS";

import { SuggestionsList } from "./SuggestionsList";

export const ResourceInput = ({ className, graph }) => {
  const lrs = useLRS();
  const formId = `form.${graph.value}.newResource`;

  const submitHandler = (values, form) => {
    try {
      const resource = new NamedNode(values.subject);

      if (values.button === "import") {
        return (lrs as any)
          .api
          .getEntity(resource)
          .then(() => {
            const delta = lrs
              .tryEntity(resource)
              .map((s) => [s.subject, s.predicate, s.object, addGraph(graph)] as Quadruple);

            lrs.processDelta(delta);
          })
          .then(() => {
            setTimeout(() => form.reset({
              graph: graph.value,
            }));
          });
      }

      return lrs.processDelta([
        [
          resource,
          new NamedNode(NS.rdf("type")),
          new NamedNode(NS.rdfs("Resource")),
          new NamedNode(NS.ll(`add?graph=${encodeURIComponent(graph.value)}`)),
        ],
      ]).then(() => {
        setTimeout(() => form.reset({
          graph: graph.value,
        }));
      });
    } catch (e) {
      lrs.actions.ontola.showSnackbar("The resource must be a valid IRI");
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6">
        New resource in graph
      </Typography>
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
              type="text"
              render={({ input }) => (
                <React.Fragment>
                  <TextField
                    {...input}
                    inputProps={input}
                    variant="outlined"
                  />
                  <SuggestionsList
                    keyword={input.value}
                    showSuggestions={!!input.value}
                    onSelect={(e) => {
                      e.preventDefault();
                      form.change("subject", new URL(e.currentTarget.href).searchParams.get("iri"));
                    }}
                    value={input.value}
                  />
                </React.Fragment>
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
          <Tooltip title="Add to graph as a rdf:Resource">
            <Button
              type="submit"
              value="add"
              variant="contained"
              onClick={(e) => { form.change("button", e.currentTarget.value); }}
            >
              Add
            </Button>
          </Tooltip>
          <Tooltip title="Fetch resource and add contents to current graph">
            <Button
              type="submit"
              value="import"
              variant="contained"
              onClick={(e) => { form.change("button", e.currentTarget.value); }}
            >
              Import
            </Button>
          </Tooltip>
        </form>
        )}
      />
    </React.Fragment>
  );
};
