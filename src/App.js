import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <h1>This is the beginning of Jabber!</h1>
    <Router>
      <>
        <Switch>
          <Route path="/" exact>
            <h1> This is the homepage </h1>
          </Route>
        </Switch>
      </>
    </Router>

    </div>
  );
}

export default App;
