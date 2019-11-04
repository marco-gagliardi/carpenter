import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Home from './Home'
import Users from './Users'

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path="/home" component={Home} />
          <Route path="/users" component={Users} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
    </Router>
  )
};

export default Routes