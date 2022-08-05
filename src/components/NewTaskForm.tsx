import React, { useState } from 'react';
import styled from "styled-components";
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function NewTaskForm() {
  const [task, setTask] = useState('');
  const [done, setDone] = useState(false);
  const [user] = useAuthState(auth);
  const userEmail = user?.email
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function handleSubmit(e) {
    e.preventDefault();
    //Handle empty submisison
    if(!task){
      alert("Task cannot be empty.");
      return;
    }

    //Submit task to firebease store with a default "done" state being false
    setDone(false)
    db.collection("users").doc("todoLists").collection(userEmail).add({
      task: task,
      done: done
    }) 

    //Clear newtask input
    setTask('');
  }
  
  return (
    <Input>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          value={task}  
          onChange={e => setTask(e.target.value)}
          placeholder="Enter todo">
        </input>
        {/* {!task && <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Please add a task.</Typography>
      </Popover>} */}
      <button onClick={handleClick}></button>
      </form>
    </Input>
  )
}

export default NewTaskForm;

const Input = styled.div`
 > form {
    position: relative;
    display: flex;
    justify-content: center;
      > button {
      background-color: darkgray;
      color: white;
      font-weight: 600;
      visibility: hidden;
    }
  }

  > form > input {
    /* position: fixed; */
    bottom: 30px;
    width: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    background-color: #40444a;
    color: gray;
  }

  margin-left: 10px;
  width: 90%;
`