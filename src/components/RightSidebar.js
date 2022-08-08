import React, { useState } from 'react';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/counter/appSlice';
import { db } from '../firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import AddIcon from "@material-ui/icons/Add";
import PowerListApp from './PowerListApp';
import ProgressBar from './ProgressBar';
import ProjectGoal from './ProjectGoal';
import  TextField  from '@material-ui/core/TextField/TextField';
import { ClickAwayListener } from '@material-ui/core';




function RightSidebar () {

  const [showAddGoal, setShowAddGoal ] = useState(false); 
  const [projectGoal, setProjectGoal ] = useState('');
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

  const addProjectGoal = async (event) => {
    setShowAddGoal(true);

    if (event.key === 'Enter') {
      event.preventDefault();
      if (projectGoal) {
        db.collection("rooms").doc(roomId).collection("project").add({
          goal: projectGoal,
          complete: false
        })
      }
      setProjectGoal('');
      setShowAddGoal(false);
    }

    if(event.key === 'Escape' || !event.target){
      event.preventDefault();
      setShowAddGoal(false);
      setProjectGoal('');
    }

  }

  const handleClickAway = () => { setShowAddGoal(false);}

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
          
            { showAddGoal &&
              <ClickAwayListener onClickAway={handleClickAway} >
                <TextField 
                  className='text-field'
                  id="standard-basic"
                  label="Enter Project Goal"
                  variant='standard'
                  inputProps={{style: {color: "white"}}}
                  autoFocus={true}
                  size='small'
                  type="text" 
                  value={projectGoal}
                  onChange={event => setProjectGoal(event.target.value)}
                  onKeyDown={addProjectGoal}
                />
              </ClickAwayListener>
            }
          
          <AddIcon fontSize='small' style={{ padding: 10 }}/> <span>Add a project goal</span>
        </RightSidebarOption>
        {/* <hr /> */}


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
  /* background-color: var(--main-color1); */
  background-color: #2F3136;
  color: white;
  flex: 0.3;
  border-top: 1px solid #202225;
  max-width: 260px;
  margin-top: 64px;
 
  > hr {
    margin-top: 1px;
    margin-bottom: 10px;
    border: 1px solid #202225;
  }

`;

const RightSidebarUpper = styled.div`
  margin-top: 2em;
  height: 50%;
  font-size: 14px;
  font-weight: 500;

  > hr {
    margin-top: 1px;
    margin-bottom: 1px;
    border: 1px solid #202225;
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

   >div >hr {
    margin-top: 1px;
    margin-bottom: 1px;
    border: 1px #202225;
    padding: 5px;
  }

  >div {
    margin-bottom: 10px;
  }

  >div >span {
    padding-left: 10px;
    padding-top: 5px;
    margin-top: 20px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 14px;
  }

  >div >ul {
    list-style: none;
    padding-inline-start: 10px;
    vertical-align: middle;
     
  }

  >div >ul >li {
    margin-left: 2px;
    :hover {
      opacity: 0.9;
      background-color: #154c79;
      >#cancel-icon {
        visibility: visible;
      }
    }
  }

  #cancel-icon{
    color: red;
    cursor: pointer;
    visibility: toggle;
    /* :hover {
      visibility: visible;
    } */
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

  > .text-field {
    min-width: -webkit-fill-available;
  }
  > .text-field  > label{
    color: gray;
  }

  > .text-field > .MuiInput-underline:after{
    border-bottom: 2px solid #0175FE;
  }



`;