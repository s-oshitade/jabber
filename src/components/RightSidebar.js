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

  const resetGoal = (id) => {
    db.collection("rooms").doc(roomId).collection("project").doc(id).update({
        complete: false
      })
  
  }

  const editGoal = (id) => {
    const goal = prompt('Edit this goal:')

    if (goal) {
      db.collection("rooms").doc(roomId).collection("project").doc(id).update({
        goal: goal,
        complete: false
      })
    }

  }

  const removeGoal = (id) => {
    db.collection("rooms").doc(roomId).collection("project").doc(id).delete();
  }
  

  return (
    <RightSidebarContainer>
      <RightSidebarUpper>

      <ProgressBar 
        projectName={roomDetails?.data().name}
        goalTotal={projectPlan?.docs.length}
        completed={finishedGoals?.docs.length}
      />
      <hr />
        <RightSidebarOption
        onClick={addProjectGoal}
        >
          <AddIcon fontSize='small' style={{ padding: 10 }}/> <span>Add a project goal</span>
        </RightSidebarOption>
        <hr />


        {projectPlan?.docs.map(doc => {
          const { goal, complete } = doc.data();

          return (
            <ProjectGoal
              key={doc.id}
              id={doc.id}
              status={complete}
              goal={goal}
              update={complete === false ? updateGoal : resetGoal}
              edit={editGoal}
              remove={removeGoal}
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
    margin-top: 1px;
    margin-bottom: 1px;
    border: 0.5px solid #154c79;
  }

`;

const RightSidebarUpper = styled.div`
  height: 50%;
  font-size: 14px;
  font-weight: 500;

  > hr {
    margin-top: 1px;
    margin-bottom: 1px;
    border: 0.5px solid #154c79;
  }


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

  >div >h4 {
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  >div >ul {
    list-style: none;
    padding-inline-start: 10px;
     
  }

  >div >ul >li {
    margin-left: 2px;
    :hover {
      opacity: 0.9;
      background-color: #154c79;
    }
  }

  #thrash-can{
    color: pink;
    cursor: pointer;
    :hover {
      color: tomato;
    }
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