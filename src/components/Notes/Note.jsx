import React from 'react'
import './note.css'
import save from '../../assets/icons/done.png'
import back from '../../assets/icons/back.png'
import bin from '../../assets/icons/bin.png'
import bin2 from '../../assets/icons/bin2.png'

const Note = ({id, title, body, notesList}) => {
    //please beware that the id for both the input and the texarea per note must be unique, to avoid html issues
  return (
    <>
    <div className="notes-save-btn">
        <img src={save} alt="save notes" id='notes-save' />
        <span>Save note</span>
    </div>
    
    <div className='note'>
        <input type="text" placeholder='Title' name="note-title" className="note-title" />

        <textarea name="" id="" placeholder='Start typing your notes ...' className="note-body">

        </textarea>
    </div>
    <div className="note-btns">
        <div className="back-delete">
            <img src={back} alt="save notes" id='notes-back-save' />
            <span>Back to notes</span>
        </div>
        <div className="back-delete">
            <img src={bin} alt="save notes" id='notes-back-save' />
            <span>Delete note</span>
        </div>
    </div>
    </>
  )
}

export default Note