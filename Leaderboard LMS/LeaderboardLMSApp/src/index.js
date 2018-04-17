import React from "react";
import ReactDOM from "react-dom";

import Login from "./pages/login.js";
import Landing from "./pages/landing.js";

import {BrowserRouter, Route, IndexRoute, Link, browserHistory, Switch} from "react-router-dom";

window.Alert = require("react-s-alert").default;
var Alert = require("react-s-alert").default;

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/landing" component={Landing} />
            <Route path="/" component={Login} />
            <Alert stack={true} />
        </Switch>
    </BrowserRouter>
    ,
    document.getElementById("root")
);