import React, { useState } from 'react';
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/counter/appSlice";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';



function SidebarOption ({ Icon, title, addChannelOption, id }) {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const [roomDetails] = useDocument(
    id && db.collection('rooms').doc(id)
  )
 
  const addChannel = () => {


    const channelName = prompt('Please enter the channel name');

    if (channelName){
      db.collection("rooms").add({
        name: channelName,
        password: null,
        owner: user.email
      });
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
              alert('Wrong password!');
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
      onClick={addChannelOption ? addChannel : selectChannel}
    >   
      {Icon && <Icon fontSize='small' style={{ padding: 10 }}/>}
      {Icon ? (
        <h3>{title}</h3>
      ): (
        <SidebarOptionChannel>
           <span>#</span> {title} 
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
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
  
`;