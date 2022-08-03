import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import Picker from 'emoji-picker-react';
function ChatInput({channelName, channelId, chatRef}) {

  // useRef is used to get the text from the input field (<input>)
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [roomDetails] = useDocument(
    channelId && db.collection('rooms').doc(channelId)
  )

  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    setInput(prevInput => prevInput + emojiObject.emoji)
    setChosenEmoji(false);
    setShowPicker(false);
    //setChosenEmoji(emojiObject);
  };

  const handleEmojiButtonClick = (e) => {
    e.preventDefault();
    setShowPicker(val => !val)
  }
  
  const openVideoCall = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')

    db.collection('rooms').doc(channelId).collection('messages')
    .add({
      message: "I've joined a video call!",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });
  }

  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!channelId) {
      return false;
    }
  
    // Access a specific room with the given channelId 
    db.collection('rooms').doc(channelId).collection('messages')
    .add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    // scroll into view after sending a message
    chatRef.current.scrollIntoView({
      behavior: "smooth"
    })

    setInput('');
    setShowPicker(false);
    
  }
  return(
  <ChatContainer>
     { showPicker && 
      <Picker 
        pickerStyle={{
          position: 'fixed',
          width: '350px',
          bottom: '100px',
          right: '355px'
      }}
        onEmojiClick={onEmojiClick} 
    />} 
    <ChatInputContainer>
      <form>
        <input type="text"
          onChange={e => setInput(e.target.value)}
          value={input}  
          placeholder={`Message #${channelName}`}>
        </input>
        
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
      <IconsContainer>
        < VideoCallIcon className='video-icon' fontSize='medium' onClick={() => openVideoCall(roomDetails?.data().roomUrl)}/>
        <EmojiEmotionsIcon className='emoji-icon' onClick={handleEmojiButtonClick} />
      </IconsContainer>
    </ChatInputContainer>
  </ChatContainer>
  )
}

export default ChatInput

const IconsContainer = styled.div`
  display: flex;

  > .emoji-icon {
    font-size: 30px;
    color: rgb(185,187,190);
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  > .video-icon {
    font-size: 30px;
    color: rgb(185,187,190);
    cursor: pointer;
  }
`

const ChatContainer = styled.div`
  position: relative;
  /* display: flex;
  flex-direction: column; */
`

const ChatInputContainer = styled.div`
  border-radius: 12px;
  background: rgb(64,68,75);
  //outermost div  
  display: flex;
  position: fixed;
  bottom: 30px;
  border: 1px solid gray;
  margin-left: 1.5em;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  width: 55%;

  > form > input {
    background-color: rgb(64,68,75);
    border: none;
    outline: none;
    color: rgb(220,221,222);
    width: 50vw; 
  }

  > form > input::placeholder {
    color: rgb(114,118,125);
    font-size: small;
    width: 400px;
  }

  > form > button {
    display: none !important;
  }

`;