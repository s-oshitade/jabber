import React from 'react'

import DeleteIcon from "@material-ui/icons/Delete";

function PowerItem({id, task, done}) {

  function handleFinish(e) {
    //...
  }

  function handleRemove(e) {
    //...
  }

  return (
    <li>
      <input type="checkbox" checked={done} onChange={handleFinish}/>
      {task}
      <a href="#" onClick={handleRemove} ><DeleteIcon /></a>
    </li>
  )
}

export default PowerItem



