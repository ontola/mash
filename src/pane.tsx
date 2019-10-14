import { LinkedResourceContainer } from "link-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Browser } from "./App";

export default {
  name: "mash",

  label() {
    return  "mash pane";
  },

  render(subject: any, dom: HTMLElement) {
    ReactDOM.render(
      <Browser>
        <LinkedResourceContainer subject={subject} />
      </Browser>,
      document.getElementById("GlobalDashboard") || dom,
    );
  },
};
