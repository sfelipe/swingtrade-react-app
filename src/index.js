import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from "./App";
import Dashboard from "./components/Dashboard";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dashboard" component={Dashboard} message={"Hi"} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
