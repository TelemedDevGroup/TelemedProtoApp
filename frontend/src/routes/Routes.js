import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "../screens/Login/Login.js";
import BasicNav from "../components/Navigation/BasicNav.js";

export const Routes = () => (
  <BrowserRouter>
    <Route exact path="/" component={Login} />
    <Route exact path="/test" component={BasicNav} />
    <Route path="/home" component={Login} />
    <Route path="/user/:userID" component={BasicNav} />
    <Route path="/doctor/:userID" component={BasicNav} />
  </BrowserRouter>
);
