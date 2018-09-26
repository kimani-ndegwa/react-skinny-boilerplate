import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Components
import { Login, App, Lobby } from "./components";

// Store
import { Provider } from "react-redux";
import { configureStore } from "./store";

// Styles
import "./styles/index";

const STORE = configureStore(); // Create the store.

const MAIN_ROUTES = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={App} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/lobby/:tableId" component={App} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={STORE}>{MAIN_ROUTES()}</Provider>,
  document.getElementById("h-app")
);
