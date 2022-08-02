import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

function ChatInput({channelName, channelId, chatRef}) {

  // useRef is used to get the text from the input field (<input>)
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);
  console.log(channelId);
  
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
    
  }
  return <ChatInputContainer>
    
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
    <EmojiEmotionsIcon className='emoji-icon'/>
  </ChatInputContainer>
  
}

export default ChatInput

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