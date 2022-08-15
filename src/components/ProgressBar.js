import React from 'react';
import styled from "styled-components";

function ProgressBar ({ projectName, goalTotal, completed }) {
  let progress;

  if (goalTotal === completed && goalTotal !== 0) {
    progress = "100";
  } else if (goalTotal === 0 && completed === 0) {
    progress = "0"
  } else {
    progress = ((completed / goalTotal) * 100).toString();
  }


  return (
    <ProgressBarContainer>
    <label for="project">{projectName} progress:</label>

    <progress id="project" max="100" value={progress}> {progress} </progress>
    </ProgressBarContainer>
  )
}

export default ProgressBar;

const ProgressBarContainer = styled.div`
  padding-left: 10px;

  > progress {
    border-radius: 5px;
    height: 1em;
    width: 95%;
  }
  > progress::-webkit-progress-value { background: rgb(2,213,160); }

`;