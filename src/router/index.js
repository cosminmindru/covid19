import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./views/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
