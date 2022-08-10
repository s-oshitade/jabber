import React, { useState } from 'react';
import { db } from '../firebase';
import styled from 'styled-components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';


function ProjectGoal ({goal, status, id, update, roomId, remove}) {
  const [isHovering, setIsHovering] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(goal);
  const [editGoal, setEditGoal] = useState(false);

  const openEditGoal = () => {
    setEditGoal(true)
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
      {status ? <CheckIcon onClick={() => {update(id)}} fontsize="small" className="complete" /> : <ArrowRightIcon onClick={() => {update(id)}} fontsize="small" className="incomplete" /> } {goal}
      </ProjectGoalInfo>
      <ProjectGoalIcons>
        {isHovering && <> <EditIcon onClick={openEditGoal} /> <ClearIcon onClick={() => {remove(id)}} style={{color: "red"}} /> </>}
      </ProjectGoalIcons>

    </ ProjectGoalContainer> )
    : (<div></div>)}
    </>
  ) 

  
}

export default ProjectGoal;

const ProjectGoalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  cursor: pointer;

:hover {
  opacity: 0.9;
  background-color: #154c79;
}


`;

const ProjectGoalInfo = styled.div`
  display: flex;
  align-items: center;

  > .complete {
    color: lightgreen;
}

  > .incomplete {
    color: white;
  }
`;

const ProjectGoalIcons = styled.div`


`;