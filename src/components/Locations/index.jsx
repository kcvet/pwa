import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../utils/PrivateRoute";
import List from "./LocationList";
import LocationEdit from "./Edit";
 
const LocationIndex = ({ match }) => {
  return (
      <Switch>
          <PrivateRoute exact path={`${match.url}`} component={List} />
          <PrivateRoute path={`${match.url}/edit/:id`} component={LocationEdit} />
      </Switch>
  );
};

export default LocationIndex;
