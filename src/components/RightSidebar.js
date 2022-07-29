import React from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import { db } from '../firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import AddIcon from "@material-ui/icons/Add";
import PowerListApp from './PowerListApp';
import ProgressBar from './ProgressBar';



function RightSidebar () {
  const roomId = useSelector(selectRoomId)

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )


  return (
    <RightSidebarContainer>
      <RightSidebarUpper>
      <ProgressBar 
        projectName={roomDetails?.data().name}
        progress={"90"}
      />
        <RightSidebarOption>
          <AddIcon fontSize='small' style={{ padding: 10 }}/> <span>Add a project plan</span>
        </RightSidebarOption>


      </RightSidebarUpper>
      <hr />
      
      <PowerListContainer>
        <PowerListApp />
      </PowerListContainer>

    </RightSidebarContainer>
  )
}

export default RightSidebar;

const RightSidebarContainer = styled.div`
  background-color: var(--main-color1);
  color: white;
  flex: 0.3;
  border-top: 1px solid #154c79;
  max-width: 260px;
  margin-top: 60px;
 
  > hr {
    border: 0.01px dotted #dceefe;
  }
`;

const RightSidebarUpper = styled.div`
  height: 50%;
`;

const PowerListContainer = styled.div`
  font-size: small;
  height: 50%;
  
  :hover {
    background: black;
  }
  >h4 {
    padding-left: 10px;
    padding-top: 5px;
  }

`;

const RightSidebarOption = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #154c79;
  }
`;