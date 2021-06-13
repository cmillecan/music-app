import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Music from "./Components/Music.jsx";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <div>Home!</div>
          </Route>
          <Route path="/game">
            <Music />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
