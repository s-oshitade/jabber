import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Message from './Message';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuthState } from "react-firebase-hooks/auth";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/counter/appSlice";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import  TextField  from '@material-ui/core/TextField/TextField';
import { ClickAwayListener } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Button from '@material-ui/core/Button/Button';
import Slide from '@material-ui/core/Slide/Slide';


function Chat() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const chatRef = useRef(null);
  /** hook to access the redux store's state. 
  * This hook takes a selector function as an argument. 
  * The selector is called with the store state. 
  * roomId was pushed inside the redux store**/
  const roomId = useSelector(selectRoomId)

  // fetch room details 
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )

  // fetch channel resources
  const [roomResources] = useCollection(
    roomId && db.collection('rooms').doc(roomId).collection('resources')
  )
  // fetch room messages from a channel with roomId and order by timestamp(asc)
  const [roomMessages, loading] = useCollection(
    roomId &&
    db
    .collection('rooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp', 'asc')
  );
  
  // scroll into view when changing or entering a channel
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [roomId, loading])

  const [menu, setMenu] = useState(null);

  const openMenu = (event) => {
    setMenu(event.currentTarget)
  }

  const closeMenu = () => {
    setMenu(null)
  }

  const [password, setPassword] = useState('');
  const [addPassword, setAddPassword] = useState(false);

  const openPasswordField = () => {
    setAddPassword(true);
    closeMenu();
  }

  const closePasswordField = () => {
    setAddPassword(false);

  }

  const makeChannelPrivate = (event) => {

    if (event.key === 'Enter') {
      event.preventDefault();
      if (password) {
        db.collection("rooms").doc(roomId).update({
          password: password
        });
      }
      setPassword('');
      closePasswordField();
    }

    if (event.key === 'Escape' || !event.target) {
      event.preventDefault()
      setPassword('')
      closePasswordField();
    }




  }

  const makeChannelPublic = () => {
    db.collection("rooms").doc(roomId).update({
      password: null
    });

    closeMenu();
  }

  const deleteChannel = () => {
    closeMenu();
    db.collection("rooms").doc(roomId).delete();

    dispatch(enterRoom({
      roomId: null
    }));
  }

  const [resourceMenu, setResourceMenu] =  useState(null);
  const [addResource, setAddResource] = useState(false);
  const [resource, setResource] = useState('');
  const [viewResources, setViewResources] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const handleDialogue = () => {
    closeResourceMenu();
    setOpenDialog(!openDialog);
    
  }


  const handleOpenDialog = () => {
    openTextField();
    setOpenDialog(true);
    closeResourceMenu();
  }

  const openResourceMenu = (event) => {
    setResourceMenu(event.currentTarget)
  }

  const closeResourceMenu = () => {
    setResourceMenu(null)
  }

  const openTextField = () => {
    setAddResource(true)
  }

  const closeTextField = () => {
    setAddResource(false)
  }

  const openViewResources = (event) => {
    setViewResources(event.currentTarget)
  }

  const closeViewResources = () => {
    setViewResources(null)
  }

  const addResourceToDb = (event) => {
    

    if (event.key === 'Enter') {
      event.preventDefault()
        if (resource) {
          const url = resource;
          const formatted = (new URL(url))
          const domain = formatted.hostname
          db.collection('rooms').doc(roomId).collection('resources').add({
            name: domain,
            url: url
          })
        }
        setResource('')
        closeTextField();
    }

    if (event.key === 'Escape' || !event.target) {
      event.preventDefault()
      setResource('')
      closeTextField();
    }
  }

  const clearResources = () => {
    closeMenu();
    db.collection('rooms').doc(roomId).collection('resources').get().then(querySnapshot => {
      querySnapshot.docs.forEach(snapshot => {
          snapshot.ref.delete();
      }) // runs through each document in resources collection and deletes each one
  })
  

  }

  const openResourceLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <ChatContainer className='scroller'>
      {roomDetails && roomMessages && (
         <>
         <Header>
           <LeftHeader>
            {user.email === roomDetails?.data().owner &&
            <>
              <MenuIcon onClick={openMenu}/>
                  <Menu
                    id="simple-menu"
                    anchorEl={menu}
                    keepMounted
                    open={Boolean(menu)}
                    onClose={closeMenu}
                  >
                    {roomDetails?.data().password && <MenuItem onClick={makeChannelPublic}>Make Channel Public</MenuItem> }
                    {!roomDetails?.data().password && <MenuItem onClick={openPasswordField}>Make Channel Private</MenuItem>}
                    <MenuItem onClick={clearResources}>Clear Channel Resources</MenuItem>
                    <MenuItem onClick={deleteChannel}>Delete Channel</MenuItem>
                  </Menu>
                </>
              }
             <h4>
               <strong>#{roomDetails?.data().name}</strong>
             </h4>
                  <NoteAddIcon onClick={openResourceMenu}/>
                  <Menu
                    id="simple-menu"
                    anchorEl={resourceMenu}
                    keepMounted
                    open={Boolean(resourceMenu)}
                    onClose={closeResourceMenu}
                  >
                    <MenuItem onClick={handleOpenDialog} >Add Resource</MenuItem>
                    <MenuItem onClick={openViewResources} >View Resources</MenuItem>
                    <Menu
                    id="simple-menu"
                    anchorEl={viewResources}
                    keepMounted
                    open={Boolean(viewResources)}
                    onClose={closeViewResources}
                  >
                    {roomResources?.docs.length === 0 ? (<MenuItem>No Resources added</MenuItem>)
                    : ( <> {roomResources?.docs.map(resource => {
                      const { name, url } = resource.data();
                      return (
                      <MenuItem onClick={() => openResourceLink(url)}>{name}</MenuItem>
                      )
                    })} </>) }
                  
                  </Menu>
                  </Menu>
              {addResource && 
                <Dialog open={openDialog}>
                  <DialogContent>
                    <DialogTitle>Please enter the resource's URL</DialogTitle>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        label="Enter URL"
                        size='small'
                        value={resource}
                        onChange={event => setResource(event.target.value)}
                        onKeyDown={addResourceToDb}
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogue} >Cancel</Button> 
                      {/* <Button type='submit' onClick={selectChannel} >Enter</Button> */}
                    </DialogActions>    
                </Dialog>
              }

              {addPassword && 
              
              <ClickAwayListener onClickAway={closePasswordField}>
                <Dialog open={true}>
                  <DialogTitle>Please enter the channel password</DialogTitle>
                    <TextField 
                      className='text-field'
                      id='standard-basic'
                      label='Enter a password'
                      variant='standard'
                      inputProps={{style: {color: 'white'}}}
                      autoFocus={true}
                      size='small'
                      type='text'
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      onKeyDown={makeChannelPrivate}/>
                </Dialog>
                </ClickAwayListener>
                
                }
           </LeftHeader>
 
           <RightHeader>
             <p>
              {/* user is OWNER of channel and NO password is set */}
             {user.email === roomDetails?.data().owner && !roomDetails?.data().password && <LockOpenIcon />}
             {user.email === roomDetails?.data().owner && !roomDetails?.data().password && <span>Your channel is public</span>}

              {/* user is OWNER of channel and has set a password */}
             {user.email === roomDetails?.data().owner && roomDetails?.data().password && <LockIcon />}
             {user.email === roomDetails?.data().owner && roomDetails?.data().password && <span>You have set this channel to private</span>}

              {/* user is NOT owner of channel and a password has been set */}
             {user.email !== roomDetails?.data().owner && roomDetails?.data().password && <LockIcon />}
             {user.email !== roomDetails?.data().owner && roomDetails?.data().password && <span>The owner of this channel has made it private</span>}

              {/* user is NOT owner of channel and NO password has been set */}
             {user.email !== roomDetails?.data().owner && !roomDetails?.data().password && <LockOpenIcon />}
             {user.email !== roomDetails?.data().owner && !roomDetails?.data().password && <span>The owner of this channel has made it public</span>}
             </p>
           </RightHeader>
         </Header>
 
         <ChatMessages>
           {roomMessages?.docs.map(doc => {
             const { message, timestamp, user, userImage} = doc.data();
 
             return (
               < Message
                 key={doc.id}
                 message={message}
                 timestamp={timestamp}
                 user={user}
                 userImage={userImage}
               />
             )
           })}
           <ChatBottom ref={chatRef} />
         </ChatMessages>
 
         <ChatInput
           chatRef={chatRef} 
           channelName={roomDetails?.data().name}
           channelId={roomId}
         />
 
       </>
      )}
     
      </ChatContainer>
    
  );
}

export default Chat

const Header = styled.div`
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #202225;
  margin-top: 1em;
  `;
  
;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`

const ChatMessages = styled.div`
  background-color: #36393F;
`;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
    margin-left: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
  }

  > .MuiSvgIcon-root {
    cursor: pointer;
  }

  >.text-field {
    margin-left: 10px;
  }
`;

const RightHeader = styled.div`
  > p {
    display: flex;
    align-items: center;
  }

  > p > span {
    font-size: 12px;
  }


  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
    cursor: pointer;
  }
`;

const ChatContainer = styled.div`
  background-color: #36393F;
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;

  > .scroller {
    scrollbar-color: red;
  }
`;


