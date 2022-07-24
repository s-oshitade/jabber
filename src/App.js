import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import styled from "styled-components";


import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
    <Router>
      <>
      <Header />
        <AppBody>
          <Sidebar />
            <Switch>
              <Route path="/">
              {/* Chat */}
              <Chat />
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
  display: flex;
  height: 100vh;
`;
