import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Music from "./Components/Music.jsx";
import NavBar from "./Components/NavBar.jsx";
import Keyboard from "./Components/Keyboard";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <div>Home!</div>
          </Route>
          <Route path="/game">
            <Music />
          </Route>
          <Route exact path="/keyboard">
            <Keyboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
