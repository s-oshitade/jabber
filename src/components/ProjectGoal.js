import React from 'react';
import styled from 'styled-components';
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

function ProjectGoal ({goal, status, id}) {
  return(
    <ProjectGoalContainer
      className={status ? "complete" : "incomplete"}
    >
      <ArrowRightAltIcon /> {goal}
    </ ProjectGoalContainer>
  )
}

export default ProjectGoal;

const ProjectGoalContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
`;