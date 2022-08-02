import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase';
import firebase from 'firebase';
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
  console.log(channelId);

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
          position: 'absolute',
          width: '350px',
          bottom: '105px',
          left: '350px'
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
      < VideoCallIcon fontSize='medium'/>
      <EmojiEmotionsIcon className='emoji-icon'
        onClick={handleEmojiButtonClick}
      />
    </ChatInputContainer>
  </ChatContainer>
  )
}

export default ChatInput

const ChatContainer = styled.div`
  position: relative;
  /* display: flex;
  flex-direction: column; */
`

const ChatInputContainer = styled.div`
  border-radius: 15px;

  //outermost div  
  display: flex;
  position: fixed;
  bottom: 30px;
  border: 1px solid gray;
  margin-left: 1.5em;
  justify-content: space-between;
  padding: 20px;
  width: 55%;

  /* > form {
    position: relative;
    display: flex;
    justify-content: center;
  } */

  > form > input {
    /* position: fixed;
    bottom: 30px;
    width: 50%; */
    /* border: 1px solid ;
    border-radius: 3px;
    padding: 20px;
    outline: none; */

    border: none;
    outline: none;
    width: 600px;
  }

  > form > button {
    display: none !important;
  }

  > .emoji-icon {
    display: flex;
    align-items: center;
  }
`;