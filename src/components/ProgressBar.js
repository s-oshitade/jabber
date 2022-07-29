import React from 'react';
import styled from "styled-components";

function ProgressBar ({ projectName, progress }) {
  return (
    <ProgressBarContainer>
    <label for="project">{projectName} progress:</label>

    <progress id="project" max="100" value={progress}> {progress} </progress>
    </ProgressBarContainer>
  )
}

export default ProgressBar;

const ProgressBarContainer = styled.div`
  padding-left: 5px;
`;