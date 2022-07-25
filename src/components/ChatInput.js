import { Button } from '@material-ui/core';
import styled from 'styled-components';
import React, { useRef, useState } from 'react'
import { db } from '../firebase';
import firebase from 'firebase';
function ChatInput({channelName, channelId}) {

  // useRef is used to get the text from the input field (<input>)
  const [input, setInput] = useState('');
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
      user: 'John Doe',
      userImage: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9'
    });

    setInput('');
    
  }
  return <ChatInputContainer>
    <form>
      <input 
        onChange={e => setInput(e.target.value)}
        value={input}  
        placeholder={`Message #ROOM`}>
      </input>
      <Button hidden type='submit' onClick={sendMessage}>
        SEND
      </Button>
    </form>
  </ChatInputContainer>
}

export default ChatInput

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;