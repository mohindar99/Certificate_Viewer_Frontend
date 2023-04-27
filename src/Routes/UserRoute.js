import React from "react";
import { Route, Redirect } from "react-router-dom";
// import Admin from "../layouts/Admin";
import User from "../layouts/User";

const UserRoute = ({ component: Component, ...rest }) => {
  let userdata = {
    type: "user"
  }

  localStorage.setItem("user", JSON.stringify(userdata));
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = props.location.search.split("token=")[1];
        localStorage.setItem("token", token);
        const tokenPresent = localStorage.getItem("token");
        if (tokenPresent) {
          return <User {...props} />;
        } else {
          return <Redirect to={"/user-login"} />;
        }
      }}
    />
  );
};

export default UserRoute;
