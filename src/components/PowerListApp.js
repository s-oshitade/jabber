import React from 'react';
import { useState, useEffect } from 'react';

import PowerItem from "./PowerItem";
import NewTaskForm from "./NewTaskForm";
import data from './data';


function PowerListApp() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    // Insert line of code for get request to data store
    setTasks(data)

  }, []);

  function addTask(task) {
    setTasks([...tasks, task])
  }

  return (
    <div className="PowerListApp">
      <h4>#Username's Powerlist</h4>
      <NewTaskForm addTask={addTask} />
      <ul>
        {tasks.map(task => <PowerItem key={task.id} {...task}>{task.task}</PowerItem>)}
      </ul>
    </div>
  )
}

export default PowerListApp
