import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

function NewTaskForm({editInput, id}) {
  const [task, setTask] = useState("");
  const [done, setDone] = useState(false);
  const [user] = useAuthState(auth);
  // const [inputState, setInputState] = useState(editInput)
  const userEmail = user?.email

  console.log(editInput)
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
    setTask("");
  }

  useEffect(() => {
    setTask(editInput);
  }, [editInput])

  return (
    <Input>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          autoFocus={true}
          value={task}  
          onChange={e => setTask(e.target.value)}
          placeholder={"Enter a todo"}>
        </input>
      </form>
    </Input>
  )
}

export default NewTaskForm;

const Input = styled.div`
 > form {
    position: relative;
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
      > button {
      background-color: darkgray;
      color: white;
      font-weight: 600;
      visibility: hidden;
    }
  }

  > form > input {
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