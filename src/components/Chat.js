import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import  StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import  InfoOutlinedIcon  from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import ChatInput from './ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Message from './Message';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useAuthState } from "react-firebase-hooks/auth";


function Chat() {
  const [user] = useAuthState(auth);

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

  const makeChannelPrivate = () => {
    const channelPassword = prompt('Please enter a password')

    db.collection("rooms").doc(roomId).update({
      password: channelPassword
    });
  }

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
              {/* user is OWNER of channel and NO password is set */}
             {user.email === roomDetails?.data().owner && !roomDetails?.data().password && <LockOpenIcon onClick={makeChannelPrivate}/>}
             {user.email === roomDetails?.data().owner && !roomDetails?.data().password && <span>Make your channel private</span>}

              {/* user is OWNER of channel and has set a password */}
             {user.email === roomDetails?.data().owner && roomDetails?.data().password && <LockIcon />}
             {user.email === roomDetails?.data().owner && roomDetails?.data().password && <span>You have set this channel to private</span>}

              {/* user is NOT owner of channel and a password has been set */}
             {user.email !== roomDetails?.data().owner && roomDetails?.data().password && <LockIcon />}
             {user.email !== roomDetails?.data().owner && roomDetails?.data().password && <span>The owner of this chanel has made it private</span>}

              {/* user is NOT owner of channel and NO password has been set */}
             {user.email !== roomDetails?.data().owner && !roomDetails?.data().password && <LockOpenIcon />}
             {user.email !== roomDetails?.data().owner && !roomDetails?.data().password && <span>The owner of this chanel has made it public</span>}
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
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

