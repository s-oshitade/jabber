import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route,
  // Link
} from "react-router-dom";


import Header from "./app/Header"

function App() {
  return (
    <div className="App">
    <Router>
      <>
        <Routes>
          <Route path="/" exact>
            <Header />
          </Route>
        </Routes>
      </>
    </Router>

    </div>
  );
}

export default App;
