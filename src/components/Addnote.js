import React, { useContext, useState } from 'react'
import noteContext from './context/Notes/noteContext'
function Addnote(props) {

    const context= useContext(noteContext);
    const {addNote}= context;

    const [note, setNote] = useState({title:"", description:"", tag:""});

    function handleChange(e)
    {
        setNote({...note,[e.target.name]:e.target.value})
    }

    function handleClick(e)
    {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.showAlert("Note added","success");

        setNote({title:"", description:"", tag:""});
    }
    return (
        <div className="add-note container my-3">
            <h2>Add a Note</h2>
            <form className='my-3' onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={handleChange} minLength={3} className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={handleChange} minLength={5} className="form-control"  value={note.description} id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" onChange={handleChange} className="form-control"  value={note.tag} id="tag" name="tag" />
                </div>
                <button type="submit" className="btn btn-primary">Add Note</button>
            </form>
        </div>

    )
}

export default Addnote
