import React, { Component } from 'react'

import {Route, Switch} from "react-router-dom";

import './App.css'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import Landing from './components/landing'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/landing" component={Landing} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default App;
