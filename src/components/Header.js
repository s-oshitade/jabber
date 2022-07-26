import React from 'react';
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import SpotifyLogin from './SpotifyLogin';
import MusicPlayer from './MusicPlayer';
import GitHubIcon from '@material-ui/icons/GitHub';
import jabberLogo from '../logo/jabber.png'

function Header ({token}) {
  const [user] = useAuthState(auth);

  const openGithub = () => {
    window.open('https://github.com/s-oshitade/jabber', '_blank', 'noopener,noreferrer')
  }
  return (
    <HeaderContainer>
      <HeaderLeft>
        {/* <AccessTimeIcon /> */}
        <img src={jabberLogo}></img>
      </HeaderLeft>
      { (token === '') ? <SpotifyLogin /> : <MusicPlayer token={token}/> }
      
      
      {/* <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search..." />
      </HeaderSearch> */}

      <HeaderRight token={token}>
        <GitHubIcon onClick={openGithub}/>
      </HeaderRight>
        


    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: px 0;
  background-color: #202225;
  color: white;
  border-bottom: 1px solid #202225;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;

  }

  > img {
    max-height: 80px;
    max-width: 97px;
    padding: 1em 1em 1em 0;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

// const HeaderSearch = styled.div`
//   flex: 0.4;
//   opacity: 1;
//   border-radius: 6px;
//   background-color: #154c79;
//   text-align: center;
//   display: flex;
//   padding: 0 50px;
//   color: gray;
//   border: 1px gray solid;

//   > input {
//     background-color: transparent;
//     border: none;
//     text-align: center;
//     min-width: 30vw;
//     outline: none;
//     color: white;
//   }
// `;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;