import React from 'react';
import { useState, useEffect } from 'react';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import PowerItem from "./PowerItem";
import NewTaskForm from "./NewTaskForm";
import data from './data';


function PowerListApp() {
  const [tasks, setTasks] = useState([]);
  const [user] = useAuthState(auth);
  
  useEffect(() => {
    // Insert line of code for get request to data store
    // const info = db.collection('users').doc('KrpJ8Q2woz1cosLoCEwH').collection('todos');
    // console.log(info);

    setTasks(data)

  }, []);

  function addTask(task) {
    setTasks([...tasks, task])
  }

  return (
    <div className="PowerListApp">
      <h4>{user.displayName} List</h4>
      <NewTaskForm addTask={addTask} />
      <ul>
        {tasks.map(task => <PowerItem key={task.id} {...task}>{task.task}</PowerItem>)}
      </ul>
    </div>
  )
}

export default PowerListApp
