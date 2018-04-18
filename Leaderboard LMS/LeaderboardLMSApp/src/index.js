import React from "react";
import ReactDOM from "react-dom";

import Login from "./pages/login.js";
import Landing from "./pages/landing.js";
import Signup from "./components/auth/signup.js";

import {BrowserRouter, Route, IndexRoute, Link, Switch} from "react-router-dom";

window.Alert = require("react-s-alert").default;
var Alert = require("react-s-alert").default;

ReactDOM.render(
    <div>
        <BrowserRouter>
            <Switch>
                <Route path="/landing" component={Landing} />
                <Route path="/auth/signup" component={Signup} />
                <Route path="/" component={Login} />
            </Switch>
        </BrowserRouter>
        <Alert stack={true} />
    </div>
    ,
    document.getElementById("root")
);