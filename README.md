# Mash browser

A browser for the linked data web.

Connect it to your SOLID pod, view dbpedia articles in the style of wikipedia, and install new applications.

This browser uses [link-redux](https://github.com/fletcher91/link-redux) to build its views, check it out for further details on the internals
of application development.

## Creating an installable package

Create an self-executing UMD package;

```JavaScript
// index.js
export default ((lrs) => {
  lrs.registerModule({
    iri: "https://example.com/application/MyClass",
    middlewares: [
      // If you have an interactive application
    ],
    ontologyStatements: [
      // If you want to say things about your ontology 
    ],
    version: 1,
    views: [],
  });
})(window.LRS);

```

#### IRI
The IRI (URL) of your package, generally the entry class, aka the one a user will bump into first.

Example; For a TODO application it would be the TODOList.

Currently this URL must resolve to a file which describes your package;

```turtle
@prefixes

<>
    a rdfs:Class, ll:InstallableComponent;
    schema:name "Demo TODO app";
    ll:npmLabel "link-redux-todomvc";
    ll:npmVersion "2.12.0".
```

#### Middlewares
Pass an array of link middlewares to be added on top of the current stack.

#### Ontology Statements
Here you can instruct link to take some ontological information into account when rendering your
views. It's generally good practice to subclass rdfs:Resource and optionally a more specific class
which fits your classes (eg schema:person and foaf:Person).

#### Views
Include all your link views in the bundle.
 
These shouldn't be the raw views, but the result of LinkRedux's `register` call.

A flat array of `RegistrableComponent` to be precise.
