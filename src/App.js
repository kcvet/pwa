/* eslint-disable no-restricted-globals */
import React, { Fragment  } from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard'
import PrivateRoute from './utils/PrivateRoute'
import Table from './components/Cars/Table'
import Locations from './components/Locations/LocationList';
import LocationsEdit from './components/Locations/Edit';
import DamagesAdd from './components/Damages/Add';
import Login from './components/Login'
import Damages from './components/Damages/CarList'
import UserAdd from './components/Users/Add'
import UserEdit from './components/Users/Edit'
import ReservationHistories from './components/ReservationHistories/ReservationList'
import ActiveReservations from './components/reservations/ReservationList'


function App() {
      return (
            <Fragment>
                <Switch>
                  <PrivateRoute  exact path="/cars/damages" component={(props) =><Dashboard {...props}><Damages all={true} {...props}/></Dashboard>} />
                  <Route  exact path="/users" component={(props) =><UserAdd {...props}></UserAdd>} />
                  <PrivateRoute  path="/cars/:carid/newDamage" component={(props) =><Dashboard {...props}><DamagesAdd {...props}></DamagesAdd></Dashboard>} />
                  <PrivateRoute  path="/cars/:carid/damages" component={(props) =><Dashboard {...props}><Damages {...props}/></Dashboard>} />
                  <PrivateRoute  exact path="/locations" component={(props) => <Dashboard {...props}><Locations {...props}/></Dashboard>} />
                  <PrivateRoute  exact path="/reservationHistories" component={(props) => <Dashboard {...props}><ReservationHistories {...props}/></Dashboard>} />
                  <PrivateRoute  exact path="/reservations" component={(props) => <Dashboard {...props}><ActiveReservations {...props}/></Dashboard>} />
                  <PrivateRoute  exact path="/users/me" component={(props) => <Dashboard {...props}><UserEdit {...props}/></Dashboard>} />
                  <PrivateRoute  path="/locations/edit/:id" component={(props) =><Dashboard {...props}><LocationsEdit {...props}/></Dashboard>} />
                  <Route path="/login" component={Login}/>
                  <PrivateRoute  path="/" component={(props) =><Dashboard {...props}><Table {...props}/></Dashboard>} />
                </Switch>  
            </Fragment>
        );
      }


export default App;

