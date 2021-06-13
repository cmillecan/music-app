import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Music from "./Components/Music.jsx";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/game">
            <Music />
          </Route>
          <Redirect from="/" to="/game" exact />
          <Route path="/">404</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
