import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from "./Header"

function App() {
  return (
    <div className="App">
    <Router>
      <>
        <Switch>
          <Route path="/" exact>
            <Header />
          </Route>
        </Switch>
      </>
    </Router>

    </div>
  );
}

export default App;
