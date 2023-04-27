import React from "react";
import { Route, Redirect } from "react-router-dom";
import Admin from "../layouts/Admin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      component={props => localStorage.getItem("token") ? <Admin {...props} props={rest} /> : <Redirect to={`/`} /> 
      }
    />
  );
};

export default PrivateRoute;
