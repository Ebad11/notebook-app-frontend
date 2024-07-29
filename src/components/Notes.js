import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from './context/Notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
    const context = useContext(noteContext);
    const navigate= useNavigate();
    const { notes, getNotes, editNote} = context;
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
    const ref = useRef();
    const refClose = useRef();
    useEffect(() => {
        if(localStorage.getItem("token"))
        {
        getNotes();
        }
        else
        {
          navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    function updateNote(currentNote) {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    function handleChange(e)
    {
        setNote({...note,[e.target.name]:e.target.value})
    }

    function handleClick(e)
    {
        e.preventDefault();
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note updated","success");
    }
    return (
        <>
            <Addnote showAlert={props.showAlert}/>

            <button type="button" style={{ display: 'none' }} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" onChange={handleChange} value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" onChange={handleChange} value={note.edescription} className="form-control" id="edescription" name="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" onChange={handleChange} value={note.etag} className="form-control" id="etag" name="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ready-notes row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
                })}
            </div>
        </>

    )
}

export default Notes
