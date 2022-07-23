import React from 'react';
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"

function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Welcome to Jabber</h2>
          <h3>
            <FiberManualRecordIcon />
            Jabber User
          </h3>

        </SidebarInfo>

      </SidebarHeader>

    </SidebarContainer>
  )
}

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--main-color1);
  color: white;
  flex: 0.3;
  border-top 1px solid #154c79;
  max-width: 260px;
  margin-top: 60px;
`;

const SidebarHeader = styled.div`

`;

const SidebarInfo = styled.div`

`;