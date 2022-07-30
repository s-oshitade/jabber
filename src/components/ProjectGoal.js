import React from 'react';
import styled from 'styled-components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckIcon from '@material-ui/icons/Check';

function ProjectGoal ({goal, status, id, update, reset}) {

  return(
    <ProjectGoalContainer
      onClick={() => {update(id)}}
    >
      {status ? <CheckIcon fontsize="small" className="complete" /> : <ArrowRightIcon fontsize="small" className="incomplete" /> } {goal}

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