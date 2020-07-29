import React from "react";
import { Route, Redirect } from "react-router-dom";
import userService from "../services/userService";
 
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const currentUser = userService.getThisUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!currentUser)
          return (
            <Redirect
              to={{
                pathname: "/user/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
 
export default ProtectedRoute;