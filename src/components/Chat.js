import { InfoOutlined, StarBorderOutlined} from '@material-ui/icons';
import  StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import  InfoOutlinedIcon  from '@material-ui/icons/InfoOutlined';
import React from 'react'
import styled from 'styled-components'

function Chat() {
  return (
    <ChatContainer>
      <>
        <Header>
          <LeftHeader>
            <h4>
              <strong>#Room-name</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </LeftHeader>

          <RightHeader>
            <p>
            <InfoOutlinedIcon /> Details
            </p>
          </RightHeader>
        </Header>

      </>
      </ChatContainer>
    
  );
}

export default Chat

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgrey`
;

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const RightHeader = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

