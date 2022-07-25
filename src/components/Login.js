import React from 'react';
import { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";
import styled from "styled-components";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer className="login__container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh7nd0lN3bn0IkYRKOx1RaWzWgLVPQ4WRC0Q&usqp=CAU"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Jabber!</h1>
          <p>www.jabber.com</p>
        </div>

        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
background-color: #f8f8f8;
height: 100vh;
display: grid;
place-items: center;
`;


const LoginInnerContainer = styled.div`
padding: 100px;
text-align: center;
background-color: white;
border-radius: 10px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

>img {
  object-fit:contain;
  height: 100px;
  margin-bottom: 40px;
}

> button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #1456d3 !important;
    color: white;
  }
`

