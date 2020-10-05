import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Login from "views/Login.js";
import Register from "views/Register.js";
import MovieList from "views/MovieList.js";
import MovieDetail from "./views/MovieDetail";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Login {...props} />} />
      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route
        path="/register-page"
        exact
        render={props => <Register {...props} />}
      />
      <Route
          path="/movie-list"
          exact
          render={props => <MovieList {...props} />}
      />
      <Route
          path="/movie-detail/:id"
          exact
          render={props => <MovieDetail {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
