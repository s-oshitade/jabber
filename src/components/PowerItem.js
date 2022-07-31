import React from 'react';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import DeleteIcon from "@material-ui/icons/Delete";


function PowerItem({id, task, done}) {
  const [user] = useAuthState(auth);
  const userEmail = user?.email;

  function handleFinish(e) {
   console.log("I got clicked!")
   console.log(id)
    //Update the database wrt the state of done
    if (done === false){
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



