import React from "react";
// eslint-disable-next-line no-unused-vars
import { Switch as Routes, Route, RouteProps } from "react-router-dom";
import HomePage from "./pages/Home";

/** @type {RouteProps[]} */
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
