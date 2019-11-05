import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Home from './Home'
import UsersList from './Users/UsersList'
import CreateUser from './Users/CreateUser'
import EditUser from './Users/EditUser'
import User from "./Users/User";

const Routes = () => {
  return (
    <Router>
        <Switch>
          <Redirect exact from='/' to='/home' />
          <Route path="/home" component={Home} />
          {/* Users */}
          <Route path="/users/new" component={CreateUser} />
          <Route path="/users/:id/edit" component={EditUser} />
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