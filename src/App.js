import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";


import Header from "./components/Header"

function App() {
  return (
    <div className="app">
    <Router>
      <>
      <Header />
        <Switch>
          <Route path="/">
           
          </Route>
        </Switch>
      </>
    </Router>

    </div>
  );
}

export default App;
