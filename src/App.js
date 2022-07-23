import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import styled from "styled-components";


import Header from "./components/Header"

function App() {
  return (
    <div className="app">
    <Router>
      <>
      <Header />
        <AppBody>
          <Switch>
            <Route path="/">
            
            </Route>
          </Switch>
        </AppBody>
      </>
    </Router>

    </div>
  );
}

export default App;

const AppBody = styled.div`

`;
