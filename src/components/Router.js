import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../App";
import PhotoDetails from "./PhotoDetails";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/photo/:id" component={PhotoDetails} />
    </Switch>
  </BrowserRouter>
);

export default Router;
