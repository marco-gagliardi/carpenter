import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Home from './Home'
import UsersList from './Users/UsersList'
import User from "./Users/User";

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path="/home" component={Home} />
          {/* Users */}
          <Route path="/users/:id" component={User} />
          <Route path="/users" component={UsersList} />
          {/* /Users */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
    </Router>
  )
};

export default Routes