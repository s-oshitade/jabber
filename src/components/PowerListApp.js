import React, { useState } from 'react';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import PowerItem from "./PowerItem";
import NewTaskForm from "./NewTaskForm.js";
import styled from 'styled-components';

function PowerListApp() {
  const [user] = useAuthState(auth);
  const userEmail = user?.email
  const[todos] = useCollection(db.collection("users").doc("todoLists").collection(userEmail).orderBy('done','asc'))


  return (
    <div className="PowerListApp">
      <span>{user.displayName}'s List</span>
      <NewTaskForm />
      <ul >
        {todos?.docs.map((doc) => (
          <>
          <PowerItemContainer>
            <PowerItem key={doc.id} 
              id={doc.id}
              task={doc.data().task}
              done={doc.data().done}
              >
            </PowerItem>
            </PowerItemContainer>
            <GoalHr>
              <hr></hr> 
            </GoalHr>
          </>  
          
          ))}
      </ul>
      
    </div>
  )
}

export default PowerListApp;

const PowerItemContainer = styled.div`
  > div {
    padding-left: 12px;
  }
  
`

const GoalHr = styled.div`
  > hr {
    border: 0;
    height: 0.8px;
    background-image: linear-gradient(to right,rgba(0,0,0,0),#e0e0e0,rgba(0,0,0,0));;
}
`



