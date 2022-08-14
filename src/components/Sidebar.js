import React from 'react';
import { useState } from 'react';
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from './SidebarOption';
import DashboardIcon from "@material-ui/icons/Dashboard"
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddIcon from "@material-ui/icons/Add";
import { Avatar } from "@material-ui/core";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";




function Sidebar({token}) {
  const [user] = useAuthState(auth);
  const [showPlayer, setShowPlayer] = useState(false);
  const [channels, loading, error] = useCollection(db.collection("rooms"));

  let spotifyURL = '';

  if (process.env.NODE_ENV !== "production") {
    spotifyURL = '/auth/login';
 } else {
    spotifyURL = `${process.env.REACT_APP_EXPRESS_URL}/auth/login`
 }

  const openSpotifyLogin = url => () => {
    window.open(url, '_self', 'noopener,noreferrer');
  }
  
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <NameContainer>
            <h2>ABC Inc.</h2>
            <h3>
              <FiberManualRecordIcon />
              {user?.displayName}
            </h3>
          </NameContainer>
          <HeaderAvatar
            onClick={() => auth.signOut()}
            src={user?.photoURL}
            alt={user?.displayName}
            />
        </SidebarInfo>
      </SidebarHeader>
       
       
      <ChannelContainer>
      <SidebarOption Icon={DashboardIcon} title="Channels" />
      </ChannelContainer>
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} title={doc.data().name} id={doc.id} userState={user.email === doc.data().owner ? "owner" : "guest"} isPublic={!doc.data().password ? true : false}/>
      ))}
     <hr />
     <SidebarOption Icon={LibraryMusicIcon} title="Music Player" openSpotifyLogin={openSpotifyLogin(spotifyURL)}/>

    </SidebarContainer>
  )
}

export default Sidebar;


const ChannelContainer = styled.div`
  pointer-events: none;
  >div > h3  {
    font-weight: 900;
    font-size: 12px;
  }
`
const NameContainer = styled.div`

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`


const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const SidebarContainer = styled.div`
  background-color: #2F3136;
  color: white;
  flex: 0.3;

  border-top: 1px solid #154c79;
  max-width: 260px;
  margin-top: 44px; 
  overflow: auto;
  /* margin-top: 83px; */
  //height: 100%;


  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 0.5px solid #202225;
  }

  > .channel {
    height: 40px;
  }

`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #202225;
  padding: 7.5px;
  margin-top: 1em;

  > .MuiSvgIcon-root {
    margin-top: 1em;
    padding: 8px;
    color: #154c79;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
display: flex;
justify-content: space-between;
  margin-top: 1em;
  flex: 1;
`;