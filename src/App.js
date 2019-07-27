/* eslint-disable no-restricted-globals */
import React, { Component, Fragment  } from 'react';
import './App.css';
import { Route, Switch, Redirect} from "react-router-dom";
import Dashboard from './components/Dashboard'
import DashboardCar from './components/DashboardCar'
import PrivateRoute from './utils/PrivateRoute'
import Table from './components/Table'
import Locations from './components/LocationList';
import Login from './components/Login'
import {isAuthenticated} from './components/Auth'

class App extends Component {
  render() {
      return (
          <div>
            <Fragment>
                <Switch>
                  <PrivateRoute  exact path="/" render={(props) => <Dashboard {...props}><Locations {...props}/></Dashboard>} />
                  <PrivateRoute   path="/car" render={(props) =><Dashboard {...props}><Table {...props}/></Dashboard>} />
                  <Route path="/login" component={Login} />
                </Switch>  
            </Fragment>
          </div>
        );
      }
  }

export default App;

