import { BlankNode, NamedNode, Node, Term } from "@ontologies/core";
import rdf from "@ontologies/rdf";
import { rdflib } from "link-lib";

import wdp from "../ontology/wdp";

export interface WorkaroundOpts {
  proxy?: boolean;
}

export const applyWorkarounds = (lrs, workarounds: WorkaroundOpts = {}) => {
  // @ts-ignore
  lrs.api.setAcceptForHost("http://dbpedia.org", "text/turtle");
  // @ts-ignore
  lrs.api.setAcceptForHost("http://www.wikidata.org/", "text/turtle");
  // @ts-ignore
  lrs.api.setAcceptForHost("https://www.wikidata.org/", "text/turtle");
  // @ts-ignore
  lrs.api.setAcceptForHost("https://argu.co/", "application/n-quads");

  if (workarounds.proxy) {
    /* Just run everything through the proxy, should drastically reduce the bug surface */
    // @ts-ignore
    lrs.api.fetcher.constructor.proxyIfNecessary = (uri) => {
    // @ts-ignore
        return lrs.api.fetcher
            .constructor
            .crossSiteProxyTemplate
            .replace("{uri}", encodeURIComponent(uri));
    };
  }

  /**
   * Normalize wikidata instanceof properties to generic rdf:type.
   */
  // @ts-ignore
  lrs.store.store.newPropertyAction(
      wdp.ns("P31"),
      (formula: rdflib.Store, subj: NamedNode | BlankNode, _pred: NamedNode, obj: Term) => {
          const type = formula.match(obj as Node, wdp.ns("statement/P31"));

          if (type) {
              type.map(({ object }) => formula.add(subj, rdf.type, object));
          }

          return true;
      },
  );
};
