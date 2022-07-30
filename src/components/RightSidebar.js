import React from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import { db } from '../firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import AddIcon from "@material-ui/icons/Add";
import PowerListApp from './PowerListApp';
import ProgressBar from './ProgressBar';
import ProjectGoal from './ProjectGoal';



function RightSidebar () {
  const roomId = useSelector(selectRoomId)

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )

  const [projectPlan] = useCollection(
    roomId && db.collection('rooms').doc(roomId).collection("project")
  )

  const [finishedGoals] = useCollection(
    roomId && db.collection('rooms').doc(roomId).collection("project").where("complete", "==", true)
  )

  const addProjectGoal = () => {
    const goal = prompt('Please enter a project goal')

    if (goal) {
      db.collection("rooms").doc(roomId).collection("project").add({
        goal: goal,
        complete: false
      })
    }
  }

  const updateGoal = (id) => {
    db.collection("rooms").doc(roomId).collection("project").doc(id).update({
        complete: true
      })
  
  }
  

  return (
    <RightSidebarContainer>
      <RightSidebarUpper>
      <ProgressBar 
        projectName={roomDetails?.data().name}
        goalTotal={projectPlan?.docs.length}
        completed={finishedGoals?.docs.length}
      />
        <RightSidebarOption
        onClick={addProjectGoal}
        >
          <AddIcon fontSize='small' style={{ padding: 10 }}/> <span>Add a project goal</span>
        </RightSidebarOption>


        {projectPlan?.docs.map(doc => {
          const { goal, complete } = doc.data();

          return (
            <ProjectGoal
              key={doc.id}
              id={doc.id}
              status={complete}
              goal={goal}
              update={updateGoal}
            />
          )
        })}



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

  > .incomplete {
    color: white;
  }

  > .complete {
    color: lightgreen;
  }
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