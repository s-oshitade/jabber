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

`;

const SidebarHeader = styled.div`

`;

const SidebarInfo = styled.div`

`;