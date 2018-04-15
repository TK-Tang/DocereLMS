import React from "react";
import {Router, Route} from "react-router";
import Login from "./pages/login.js"

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Login} />
    </Router>
);

export default Routes;