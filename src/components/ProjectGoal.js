import React, { useState } from 'react';
import { db } from '../firebase';
import  TextField  from '@material-ui/core/TextField/TextField';
import { ClickAwayListener } from '@material-ui/core';
import styled from 'styled-components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function ProjectGoal ({goal, status, id, update, roomId, remove}) {
  const [isHovering, setIsHovering] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(goal);
  const [editGoal, setEditGoal] = useState(false);

  const openEditGoal = () => {
    setEditGoal(true)
  }

  const closeEditGoal = () => {
    setEditGoal(false);
  }

  const submitEditGoal = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      if (currentGoal) {
        db.collection("rooms").doc(roomId).collection("project").doc(id).update({
          goal: currentGoal,
          complete: false
        })
      }
      closeEditGoal();
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setCurrentGoal(goal);
      closeEditGoal();

    }



  }

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return(
    <>
    
    {editGoal === false ? (
    <ProjectGoalContainer
      onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}
    > 
    
    <ProjectGoalInfo>
      {status ? <CheckBoxIcon onClick={() => {update(id)}} fontsize="small" className="complete" /> : <CheckBoxOutlineBlankIcon onClick={() => {update(id)}} fontsize="smallest" className="incomplete" /> } <span>{goal}</span>
      </ProjectGoalInfo>
      <ProjectGoalIcons>
        {isHovering && <> <EditIcon onClick={openEditGoal} /> <ClearIcon onClick={() => {remove(id)}} style={{color: "red"}} /> </>}
      </ProjectGoalIcons>
      
    </ ProjectGoalContainer> )
    : 
    <EditGoalContainer>
    <ClickAwayListener onClickAway={closeEditGoal}>
        <TextField
          className='text-field'
          id="standard-basic"
          variant='standard'
          inputProps={{style: {color: "white"}}}
          autoFocus={true}
          size='small'
          type="text"
          value={currentGoal}
          onChange={event => setCurrentGoal(event.target.value)}
          onKeyDown={submitEditGoal} />
      </ClickAwayListener>
      </EditGoalContainer>
      }
      <GoalHr>
        <hr /> 
      </GoalHr>  
    </>
  ) 

  
}

export default ProjectGoal;

const GoalHr = styled.div`

> hr {
    border: 0;
    height: 0.8px;
    background-image: linear-gradient(to right,rgba(0,0,0,0),#e0e0e0,rgba(0,0,0,0));;
}
`

const EditGoalContainer = styled.div`

 .text-field {
    min-width: -webkit-fill-available;
  }
  > .text-field  > label{
    color: gray;
  }

  > .text-field > .MuiInput-underline:after{
    border-bottom: 2px solid #0175FE;
  }

`

const ProjectGoalContainer = styled.div`
    margin-left: 15px;
    margin-right: 6px;
    border-radius: 8px;
    padding: 4px;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  cursor: pointer;

:hover {
  opacity: 0.9;
  background-color: #43474D;
}
`;

const ProjectGoalInfo = styled.div`
  display: flex;
  align-items: center;

  > span {
    padding-left: 5px;
  }

  > svg {
    font-size: large;
  }

  > .complete {
    color: rgb(2,213,160);
  }

  > .incomplete {
    color: white;
  }
`;

const ProjectGoalIcons = styled.div`


`;