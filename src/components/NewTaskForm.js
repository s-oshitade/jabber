import React, { useState } from 'react';
import styled from "styled-components";
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase';
import ControlPointIcon from "@material-ui/icons/ControlPoint";


function NewTaskForm(props) {
  const [task, setTask] = useState('');
  const [user] = useAuthState(auth);

  function handleSubmit(e) {
    e.preventDefault();
    //send post request to datastore at the appropriate route, with the inputted data
    const info = db.collection('users').doc('KrpJ8Q2woz1cosLoCEwH').collection('todos');
    console.log(info?.data())
    // Render updated items on screen: props.addTask, to include {todo: {task: task}}
    //handle this asynchronously and run props.addTask(res.data);
    if(!task){
      alert("Task cannot be empty.");
      return;
    }

    
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
     <button>Add</button>
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
  }

  > form > input {
    /* position: fixed; */
    bottom: 30px;
    width: 90%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 10px;
    outline: none;
  }

  margin-left: 10px;
  width: 90%;
`