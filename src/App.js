/* eslint-disable no-restricted-globals */
import React, { Fragment  } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard'
import PrivateRoute from './utils/PrivateRoute'
import Table from './components/Table'
import Locations from './components/Locations/LocationList';
import LocationsEdit from './components/Locations/Edit';
import DamagesAdd from './components/Damages/Add';
import Login from './components/Login'
import Damages from './components/Damages/CarList'

function App() {
      return (
            <Fragment>
                <Switch>
                  <PrivateRoute  exact path="/" component={(props) =><Dashboard {...props}><Table {...props}/></Dashboard>} />
                  <PrivateRoute  path="/cars/:carid/newDamage" component={(props) =><DamagesAdd {...props}></DamagesAdd>} />
                  <PrivateRoute  path="/cars/:carid/damages" component={(props) =><Dashboard {...props}><Damages {...props}/></Dashboard>} />
                  <PrivateRoute  exact path="/locations" component={(props) => <Dashboard {...props}><Locations {...props}/></Dashboard>} />
                  <PrivateRoute  path="/locations/edit/:id" component={(props) =><LocationsEdit {...props}/>} />
                  <Route path="/login" component={Login}/>
                </Switch>  
            </Fragment>
        );
      }


export default App;

