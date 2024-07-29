import React, { useContext } from 'react'
import noteContext from './context/Notes/noteContext'
function Noteitem(props) {
    const { note, updateNote} = props
    const context= useContext(noteContext);

    const {deleteNote}= context;
    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"> {note.title}</h5>
                        <p className="card-text">  {note.description}</p>
                        <i className="fa-regular fa-pen-to-square me-2" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-regular fa-trash-can" onClick={()=>{deleteNote(note._id)
                                props.showAlert("Note deleted","success");
                            }}></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
