import React, { useState } from 'react';
import styled from "styled-components";
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

function NewTaskForm() {
  const [task, setTask] = useState('');
  const [done, setDone] = useState(false);
  const [user] = useAuthState(auth);
  const userEmail = user?.email

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