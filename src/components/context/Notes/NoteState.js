import { useState } from "react";
import NoteContext from "./noteContext";
function NoteState(props) {
    const [notes, setNotes] = useState([]);
    const host="https://notebook-app-backend-ebadshk.vercel.app"

    //Get all notes
    async function getNotes()
    {
      // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });

        const json= await response.json();
        setNotes(json);

    }
    // Add a note
     async function addNote(title, description, tag)
     {
       // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          }); 
          getNotes();
     }


    // Delete a note
   async function deleteNote(id)
    {
      // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          getNotes();
    }


    // Edit a note
    async function editNote(id, title,description, tag)
    {
      // eslint-disable-next-line     
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }, 
          body:JSON.stringify({title,description,tag})
        });
        getNotes();   
    }



    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;
