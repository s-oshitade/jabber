import React, { useState } from 'react';
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/counter/appSlice";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import ForumIcon from '@material-ui/icons/Forum';
import LockIcon from '@material-ui/icons/Lock';




function SidebarOption ({ Icon, title, addChannelOption, id, userState, isPublic, openSpotifyLogin}) {
  const [user] = useAuthState(auth);
  const [addingChannel, setAddingChannel] = useState(false);
  const [channelName, setChannelName] = useState('');
  const dispatch = useDispatch();

  const [roomDetails] = useDocument(
    id && db.collection('rooms').doc(id)
  )



 
  const addChannel = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (channelName){
        const response = await fetch('/whereby/meeting');
      
        const body = await response.json();
    
  
        db.collection("rooms").add({
          name: channelName,
          password: null,
          owner: user.email,
          roomUrl: body.roomUrl,
          hostUrl: body.hostRoomUrl
        });
      }
      setAddingChannel(false);
    }


  };



  const selectChannel = () => {
    const isPrivate = roomDetails?.data().password

    if (id) {
      if (user.email === roomDetails?.data().owner){
        dispatch(enterRoom({
          roomId: id
        }))
      } else {
          if (isPrivate) {
            const userInput = prompt('This channel is private. Please enter a password');

            if (userInput === isPrivate) {
              dispatch(enterRoom({
                roomId: id
              }))
            } else {
              if (userInput) {
              alert('Wrong password!');
              }
            }
          } else {
          dispatch(enterRoom({
            roomId: id
          }))
        }
        }
    }
  };

  return (
    
    <SidebarOptionContainer
      
      onClick={openSpotifyLogin || (addChannelOption ? () => {setAddingChannel(true)} : selectChannel)}
      className={id && "channel"}
    >   
      {addingChannel && 
      <input 
        type="text" 
        placeholder="Channel name" 
        value={channelName}
        onChange={event => setChannelName(event.target.value)}
        onKeyDown={addChannel}
        />}
      {Icon && <Icon fontSize='small' style={{ padding: 10 }}/>}
      {Icon ? (
        <h3>{title}</h3>
      ): (
        <SidebarOptionChannel
        className={userState} >
           {isPublic? <ForumIcon fontSize='small' style={{ padding: 10 }}/> : <LockIcon fontSize='small' style={{ padding: 10 }} />} {title} 
           
           
        </SidebarOptionChannel>
      )}

    </SidebarOptionContainer>
  )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #154c79;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px; 
  }

  > .owner {
    color: lightgreen;
  }

  > .guest {
    color: white;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
  display: flex;
  align-items: center;


`;