import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import  TextField from '@material-ui/core/TextField/TextField';
import { ClickAwayListener } from '@material-ui/core';


function NewTaskForm() {
  const [task, setTask] = useState("");
  const [user] = useAuthState(auth);
  const [showTodoInput, setShowTodoInput] = useState(false);
  const userEmail = user?.email


  function handleSubmit(e) {
    setShowTodoInput(true)
    e.preventDefault();
    //Handle empty submisison
    if(!task){
      alert("Task cannot be empty.");
      return;
    }


    db.collection("users").doc("todoLists").collection(userEmail).add({
      task: task,
      done: false
    }) 

    //Clear newtask input
    setTask("");
    setShowTodoInput(false)
  }


  return (
    <RightSidebarOption onClick={() => {setShowTodoInput(true)}}>
{ showTodoInput &&
      <ClickAwayListener onClickAway={() => {setShowTodoInput(false)}}>
      <form onSubmit={handleSubmit}>
      <TextField
        className='text-field'
        id="standard-basic"
        label="Enter TODO"
        variant='standard'
        inputProps={{style: {color: "white"}}}
        autoFocus={true}
        size='small'
        type="text" 
        value={task}  
        onChange={e => setTask(e.target.value)}
      />
      </form>
      </ClickAwayListener>
    }
    {!showTodoInput && <><AddCircleOutlineIcon fontSize='small' style={{ padding: 10 }}/><span>Add TODO</span></>}
    
    </RightSidebarOption>
    
    
  )
}

export default NewTaskForm;


const RightSidebarOption = styled.div`
  font-weight: 800;
  margin-left: 4px;
  margin-right: 4px;
  border-radius: 8px;
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #43474D;
  }

 > form > .text-field {
    width: 21em;
    min-width: 70px;
  }
 > form >.text-field  > label{
    color: gray;
  }

 > form .text-field > .MuiInput-underline:after{
    border-bottom: 2px solid #0175FE;
  }
  `

// const Input = styled.div`
//  > form {
//     position: relative;
//     display: flex;
//     margin-bottom: 10px;
//     justify-content: center;
//       > button {
//       background-color: darkgray;
//       color: white;
//       font-weight: 600;
//       visibility: hidden;
//     }
//   }

//   > form > input {
//     bottom: 30px;
//     width: 100%;
//     border: 1px solid gray;
//     border-radius: 5px;
//     padding: 10px;
//     outline: none;
//     background-color: #40444a;
//     color: gray;
//   }

//   margin-left: 10px;
//   width: 90%;
// `