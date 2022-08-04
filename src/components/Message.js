import React from 'react';
import styled from 'styled-components';

function Message({message, timestamp, user, userImage}) {
  let formattedMessage = message;
  if (message.includes("upcdn.io")){
    formattedMessage = <img src={message} alt="" width="200px"/>
  }


  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user}{' '}
          <span>
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>
        <p>{formattedMessage}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

export default Message

const MessageContainer = styled.div`
display: flex;
align-items: center;
padding: 20px;

> img {
  height: 50px;
  border-radius: 8px;
}

`;

const MessageInfo = styled.div`
  padding-left: 10px;
  > p {
    color: #D5D6D8;
  }
  > h4 {
    color: #FFFFFF;
  }
  > h4 > span {
    color: #A1A4A8;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }

`;