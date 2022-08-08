import React, { useState } from 'react';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import PowerItem from "./PowerItem";
import NewTaskForm from "./NewTaskForm.js";

function PowerListApp() {
  const [user] = useAuthState(auth);
  const userEmail = user?.email
  const[todos] = useCollection(db.collection("users").doc("todoLists").collection(userEmail).orderBy('done'))
  const[editText, setEditText] = useState("");
  const[id, setId] = useState("");

  function editItem (text, id) {
    console.log("Received edit ping")
    console.log(text)
    setEditText(text)
    setId(id)
  }

  return (
    <div className="PowerListApp">
      <span>{user.displayName}'s List</span>
      <hr />
      <NewTaskForm editInput={editText} id={id}/>
      <ul>
        {todos?.docs.map((doc) => (
          <PowerItem key={doc.id} 
            id={doc.id}
            task={doc.data().task}
            done={doc.data().done}
            edit={editItem}
            >
          </PowerItem>
          ))}
      </ul>
    </div>
  )
}

export default PowerListApp;

