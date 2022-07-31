import React from 'react';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import PowerItem from "./PowerItem";
import NewTaskForm from "./NewTaskForm";

function PowerListApp() {
  const [user] = useAuthState(auth);
  const userEmail = user?.email
  const[todos] = useCollection(db.collection("users").doc("todoLists").collection(userEmail))

  return (
    <div className="PowerListApp">
      <h4>{user.displayName}'s List</h4>
      <NewTaskForm />
      <ul>
        {todos?.docs.map((doc) => (
          <PowerItem key={doc.id} 
            id={doc.id}
            task={doc.data().task}
            done={doc.data().done}></PowerItem>
          ))}
      </ul>
    </div>
  )
}

export default PowerListApp