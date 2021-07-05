import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";

export const Pages = () => {
  const user = localStorage.getItem("profile");
  const history = useHistory();
  if (user == null) {
    history.push("/");
  }
  return (
    <Switch>
      <Route path="/chats">
        {user !== null ? <Home /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/">
        <Auth />
      </Route>
    </Switch>
  );
};
