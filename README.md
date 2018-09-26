# Link dbpedia

A browser for dbpedia (and possily wikidata) articles, in the style of wikipedia and dbpedia.

## Project layout

* Canvas - Possible types of views a resource or property can be rendered in (e.g. a modal, table
row, etc)
* Component - Views not fitting into the other categories
* Outline - View implementation of a certain class, characterized by long lists of `Property`
statements. These should probably be replaced by a neural network on the long run.
* View - Renders properties, the category name should be better though.
