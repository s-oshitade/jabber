import React, {useState} from 'react';
import styled from 'styled-components';
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';


function PowerItem({id, task, done, edit}) {
  const [user] = useAuthState(auth);
  const userEmail = user?.email;
  const [isHovering, setIsHovering] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);
  const [editTask, setEditTask] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  const openTextField = () => {
    setEditTask(true);
  }

  const closeTextField = () => {
    setEditTask(false);
  }

  function handleFinish(e) {
   console.log("I got clicked!")
   console.log(id)
    //Update the database wrt the state of done
    if (!done){
      db.collection("users").doc("todoLists").collection(userEmail).doc(id).update({
        done: true
      });
    } else {
      db.collection("users").doc("todoLists").collection(userEmail).doc(id).update({
        done: false
      });
    }
  }

  function editClicked() {
    console.log("Someone clicked EditIcon")
    edit(task, id)
    handleRemove()
  }
  // function handleEdit(e) {
  //   console.log("Someone just clicked the edit button!")
  //   const updatedTask = prompt('Update the selected task')
    
  //   if(!updatedTask){
  //     return alert("Updated task cannot be empty.")
  //   }
    
  //   db.collection("users").doc("todoLists").collection(userEmail).doc(id).update({
  //     task: updatedTask,
  //     done: false
  //   });
  // }

  function handleRemove(e) {
    console.log("Removal attempted") //TODO: Prompt user to cofirm delete
    db.collection("users").doc("todoLists").collection(userEmail).doc(id).delete();
  }

  return (
    <>
      {!editTask ? (
      <PowerListContainer
        onMouseOver={handleMouseOver} 
        onMouseOut={handleMouseOut}
      >
        <PowerListInfo>
          {!done ? <CheckBoxOutlineBlankIcon onClick={handleFinish} fontSize='small' style={{ padding: 5, paddingLeft: 0 }}/> : <CheckBoxIcon onClick={handleFinish} fontSize='small' style={{ padding: 5, paddingLeft: 0,}} className="checked"/> }
            {task}
          
        </PowerListInfo>
        
        
        <PowerListIcons>
          {isHovering && 
          <>
          <EditIcon onClick={openTextField} />
          <ClearIcon id="clear-icon" onClick={handleRemove} style={{color: "red"}}/>
          </>}
        </PowerListIcons>
      </PowerListContainer>
      ) : (<div></div>)}
    </>   
  )
}

export default PowerItem;

const PowerListContainer = styled.div`
  padding-left: 4px;
  margin-right: 6px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding-left: 2px;
  cursor: pointer;

  :hover {
  opacity: 0.9;
  background-color: #43474D;
}


`

const PowerListInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .checked {
    color: rgb(2,213,160);
  }
  
`

const PowerListIcons = styled.div`


`;

