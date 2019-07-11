import React, { Component, Fragment  } from 'react';
import './App.css';
import { Route, Switch, Redirect} from "react-router-dom";
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import {isAuthenticated} from './components/Auth'

class App extends Component {
  render() {
      return (
          <div>
            <Fragment>
                <Switch>
                  <Route  exact path="/" render={(props) => (isAuthenticated() === true? <Dashboard {...props} />: <Redirect to='/login' />)} />
                  <Route path="/login" component={Login}/>
                </Switch>  
            </Fragment>
          </div>
        );
      }
  }

export default App;
