import React from 'react';
import styled from "styled-components";

function RightSidebar () {
  return (
    <RightSidebarContainer>
      {/* Right Sidebar features go here */}
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
`;