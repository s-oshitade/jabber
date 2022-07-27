import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import  StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import  InfoOutlinedIcon  from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Message from './Message';
import LockIcon from '@material-ui/icons/Lock';


function Chat() {

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

  console.log(roomDetails?.data());
  console.log(roomMessages);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
         <>
         <Header>
           <LeftHeader>
             <h4>
               <strong>#{roomDetails?.data().name}</strong>
             </h4>
             <StarBorderOutlinedIcon />
           </LeftHeader>
 
           <RightHeader>
             <p>
             <LockIcon /> Make this channel private
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
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgrey;
  `;
  
;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`

const ChatMessages = styled.div``;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const RightHeader = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

