import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import {Router, Route, IndexRoute, Link, browserHistory} from "react-router";

window.Alert = require("react-s-alert").default;
var Alert = require("react-s-alert").default;

ReactDOM.render(
    <div>
        <Routes history={browserHistory} />
        <Alert stack={true} />
    </div>
    ,
    document.getElementById("root")
);