import React from "react";
import { Switch as Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";

const routes = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: HomePage,
  },
];

const Router = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.name} {...route} />
      ))}
    </Routes>
  );
};

export default Router;
