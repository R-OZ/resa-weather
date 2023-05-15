import React from 'react'
import './notesCard.css'

const NotesCard = ({note_obj, handleClick}) => {
  return (
    <div className="notes-card">
        <p className="notes-card-title">
           <span id='notes-card-title1'> {note_obj.title}</span>
        </p>
        <div className="notes-card-body">
            {note_obj.body}
        </div>
    </div>
    )
}

export default NotesCard