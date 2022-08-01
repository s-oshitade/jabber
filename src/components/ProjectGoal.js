import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';


function ProjectGoal ({goal, status, id, update, edit, remove}) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return(
    <ProjectGoalContainer
      onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}
    > 
      {status ? <CheckIcon onClick={() => {update(id)}} fontsize="small" className="complete" /> : <ArrowRightIcon onClick={() => {update(id)}} fontsize="small" className="incomplete" /> } {goal}

      <ProjectGoalIcons>
        {isHovering && <> <EditIcon onClick={() => {edit(id)}} /> <ClearIcon onClick={() => {remove(id)}} style={{color: "red"}} /> </>}
      </ProjectGoalIcons>

    </ ProjectGoalContainer>
  )
}

export default ProjectGoal;

const ProjectGoalContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
  cursor: pointer;

:hover {
  opacity: 0.9;
  background-color: #154c79;
}

> .complete {
  color: lightgreen;
}

> .incomplete {
  color: white;
}

`;

const ProjectGoalIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 5px;
`;