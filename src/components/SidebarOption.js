import React, { useState } from 'react';
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/counter/appSlice";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import ForumIcon from '@material-ui/icons/Forum';
import LockIcon from '@material-ui/icons/Lock';
import  TextField  from '@material-ui/core/TextField/TextField';
import { ClickAwayListener } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Button from '@material-ui/core/Button/Button';




function SidebarOption ({ Icon, title, addChannelOption, id, userState, isPublic, openSpotifyLogin}) {
  const [user] = useAuthState(auth);
  const [addingChannel, setAddingChannel] = useState(false);
  const [channelName, setChannelName] = useState('');

  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [addPassword, setAddPassword] = useState('');
  const [passwordEntered, setPasswordEntered] = useState(false);

  const [errorText, setErrorText] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const [roomDetails] = useDocument(
    id && db.collection('rooms').doc(id)
  )

  const handleClickAway = ( ) => { setAddingChannel(false); }

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
      setChannelName('');
      setAddingChannel(false);
    }

    if(event.key === 'Escape' || !event.target){
      event.preventDefault();
      setAddingChannel(false);
      setChannelName('');
    }
  };



  const selectChannel = (event) => {
    const isPrivate = roomDetails?.data().password

    if (id) {
      if (user.email === roomDetails?.data().owner){
        dispatch(enterRoom({
          roomId: id
        }))
      } else {
        if (isPrivate && !passwordEntered) {
          setShowPasswordDialog(true);
            if (event.key === 'Enter' ) {
              event.preventDefault();
              if (addPassword === isPrivate) {
                dispatch(enterRoom({ roomId: id }))
                setPasswordEntered(true);
                setShowPasswordDialog(false);
                setAddPassword('');
              } else {
                  if (addPassword) {
                    setErrorText('Wrong Password');
                    setError(true);
                    setAddPassword('');
                  }
                }  
              } 
            } else {
              dispatch(enterRoom({
                roomId: id
              }))
            }
            if(event.key === 'Escape' || !event.target){
              event.preventDefault();
              setShowPasswordDialog(false);
              setAddPassword('');
            }
          }
        }
      };

  return (
  <>
  {
    <Dialog open={showPasswordDialog} >
      <DialogTitle>Please enter channel password</DialogTitle>
        <DialogContent>
          <TextField
            error={error}
            helperText={errorText}
            autoFocus
            margin="dense"
            id="name"
            label="password"
            type="password"
            fullWidth
            variant="standard"
            value={addPassword}
            onChange={event => setAddPassword(event.target.value)}
            onKeyDown={selectChannel}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)} >Cancel</Button> 
          {/* <Button type='submit' onClick={selectChannel} >Enter</Button> */}
        </DialogActions>
    </Dialog> }

    
    <SidebarOptionContainer
      
      onClick={openSpotifyLogin || (addChannelOption ? () => {setAddingChannel(true)} : selectChannel)}
      className={id && "channel"}
    >   
      {addingChannel && 
      <ClickAwayListener onClickAway={handleClickAway}>
        <TextField 
          className='text-field'
          id="standard-basic"
          label="Add Channel"
          variant='standard'
          inputProps={{style: {color: "white"}}}
          autoFocus={true}
          size='small'
          type="text" 
          value={channelName}
          onChange={event => setChannelName(event.target.value)}
          onKeyDown={addChannel}
        />
      </ClickAwayListener>}
      {Icon && <Icon fontSize='small' style={{ padding: 10 }}/>}
      {Icon ? (
        <h3>{title}</h3>
      ): (
        <SidebarOptionChannel 
        className={userState} >
           {isPublic? <ForumIcon fontSize='small' style={{ padding: 10 }}/> : 
           <LockIcon fontSize='small' style={{ padding: 10 }} />} {title} 
        </SidebarOptionChannel>
      )}

    </SidebarOptionContainer>
    </>
  )
  
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  margin-left: 8px;
  margin-right: 8px;
  border-radius: 8px;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  
  :hover{
    opacity: 0.9;
    background-color: #43474D;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px; 
  }

  > .owner {
    color: #3674d1;
  }

  > .guest {
    color: white;
  }

  > .text-field {
    min-width: -webkit-fill-available;
  }
  > .text-field  > label{
    color: gray;
  }

  > .text-field > .MuiInput-underline:after{
    border-bottom: 2px solid #90EE90;
  }

`;

const SidebarOptionChannel = styled.h3`

  padding: 10px 0;
  font-weight: 300;
  display: flex;
  align-items: center;
`;