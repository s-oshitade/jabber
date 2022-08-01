import React from 'react';
import styled from 'styled-components';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import ClearIcon from '@material-ui/icons/Clear';


function PowerItem({id, task, done}) {
  const [user] = useAuthState(auth);
  const userEmail = user?.email;

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
    <PowerListContainer>
      <PowerListInfo>
        <input type="checkbox" checked={done} onChange={handleFinish}/>
        {task}
        <a href="#" onClick={handleRemove} >
        <ClearIcon id="clear-icon"/></a>
      </PowerListInfo>
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
  align-items: center;
  vertical-align: middle;
  >a {
    color: red;
    visibility: hidden;

  }
  :hover {
      >a {
        visibility: visible;
    }
  }
`

