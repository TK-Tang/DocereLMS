import React, { Component } from 'react'

import {Route, Switch} from "react-router-dom";

import './App.css'
import Signup from './components/auth/signup'
import Signin from './components/auth/signin'
import Landing from './components/landing'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/landing" component={Landing} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/" component={Signin} />
      </Switch>
    );
  }
}

export default App;
