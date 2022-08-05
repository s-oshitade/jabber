import React, {useState} from 'react';
import styled from 'styled-components';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import LensOutlinedIcon from '@material-ui/icons/LensOutlined';


function PowerItem({id, task, done}) {
  const [user] = useAuthState(auth);
  const userEmail = user?.email;
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  function handleFinish(e) {
   console.log("I got clicked!")
   console.log(id)
    //Update the database wrt the state of done
    if (!done){
      db.collection("users").doc("todoLists").collection(userEmail).doc(id).update({
        done: true
      });
    } else {
      db.collection("users").doc("todoLists").collection(userEmail).doc(id).update({
        done: false
      });
    }
  }

  function handleRemove(e) {
    console.log("Removal attempted") //TODO: Prompt user to cofirm delete
    db.collection("users").doc("todoLists").collection(userEmail).doc(id).delete();
  }

  return (
    <PowerListContainer
      onMouseOver={handleMouseOver} 
      onMouseOut={handleMouseOut}
    >
      <PowerListInfo>
        {!done ? <LensOutlinedIcon onClick={handleFinish} fontSize='small' style={{ padding: 5, paddingLeft: 0 }}/> : <CheckCircleOutlinedIcon onClick={handleFinish} fontSize='small' style={{ padding: 5, paddingLeft: 0,}} className="checked"/> }
          {task}
      </PowerListInfo>
      <PowerListIcon>
        {isHovering && <ClearIcon id="clear-icon" onClick={handleRemove} style={{color: "red"}}/>}
      </PowerListIcon>
    </PowerListContainer>
  )
}

export default PowerItem;

const PowerListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 2px;
  cursor: pointer;

  :hover {
  opacity: 0.9;
  background-color: #154c79;
}
`

const PowerListInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .checked {
    color: lightgreen;
  }
  
`

const PowerListIcon = styled.div`


`;

