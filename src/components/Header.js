import React from 'react';
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime"

function Header () {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
        // TODO: ADD ONCLICK 
        />
        <AccessTimeIcon />
      </HeaderLeft>
        


    </HeaderContainer>
  )
}

export default Header;

const HeaderContainer = styled.div`

`;

const HeaderLeft = styled.div`

`;

const HeaderAvatar = styled(Avatar)`

`;