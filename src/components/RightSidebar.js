import React from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import { db } from '../firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import AddIcon from "@material-ui/icons/Add";

function RightSidebar () {
  const roomId = useSelector(selectRoomId)

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )

  return (
    <RightSidebarContainer>
      <RightSidebarUpper>

        <RightSidebarOption>
          <AddIcon fontSize='small' style={{ padding: 10 }}/> <span>Add a project plan</span>
        </RightSidebarOption>

      </RightSidebarUpper>
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
`;

const RightSidebarUpper = styled.div`

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