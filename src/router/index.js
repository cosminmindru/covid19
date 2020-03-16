import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./views/Home";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </Switch>
  );
};

export default Router;
