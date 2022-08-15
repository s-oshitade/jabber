import React, { useEffect, useState } from 'react';
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
import Chat from './components/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { useSelector } from 'react-redux';
import { selectRoomId } from './features/counter/appSlice';
import Login from "./components/Login";
import Spinner from "react-spinkit";

import RightSidebar from './components/RightSidebar';

function App() {
  const [user, loading] = useAuthState(auth);
  const roomId = useSelector(selectRoomId)

  const [token, setToken] = useState('');

  useEffect (() => {
    async function getToken() {
      let response = '';

      if (process.env.NODE_ENV !== "production") {
        response = await fetch(`/auth/token`);
     } else {
        response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/auth/token`);
     }
      //const response = await fetch(`${process.env.REACT_APP_EXPRESS_URL}/auth/token`);
      const json = await response.json();
      setToken(json.access_token)
    }
    getToken();
  }, [])

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://github.com/s-oshitade/jabber/blob/main/docs/logo-asset49.png?raw=true"
            alt=""
          />

          <Spinner
            className="app__spinner"
            name="ball-spin-fade-loader"
            color="#1456d3"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header token={token}/>
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/room/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                  {roomId && <RightSidebar />} 
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>

    </div>
  );
}

export default App;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
