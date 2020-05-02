import React from "react";
import { Switch as Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </Routes>
  );
};

export default Router;
