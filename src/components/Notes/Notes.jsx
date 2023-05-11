import React from 'react'
import './notes.css'
import NotesCard from './NotesCard'
import Note from './Note'
import add from '../../assets/icons/add.png'
import back from '../../assets/icons/back.png'
import remove from '../../assets/icons/delete.png'
import notes from '../../assets/icons/notes.png'
import { useState, useEffect } from 'react'
import { useGlobalState } from '../../Context'

const Notes = ({notesList}) => {
    //remember you need to consider the state of the text in the search bar in mobile version so you can use that state to decided a display none for the notes-icon so you wont have icon clashing there.
    const [isOpen, setIsOpen] = useState(false)
    const [list, setList]= useState([1,2,3,4,5,6,7])
    const [isEditing, setIsEditing] = useState(false)
    const {searchValue, windowWidthValue} = useGlobalState()
    const [searchText, setSearchText] = searchValue  
    const notesSwitch =()=>{
        setIsOpen(!isOpen)
    }
    const removeItem = (index) => {
        setList((prevList) => {
        const newItems = [...prevList];
        newItems.splice(index, 1);
        return newItems;
        });
      };  
    
    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isOpen]);

    return (
    <div className='notes-container'>
        <img src={notes} alt="notes" onClick={windowWidthValue<1024? notesSwitch : null} id='notes-icon' style={{display: searchText?'none': ''}} />

        <div className={`notes-drawer ${isOpen? 'slide': ''}`}>
            <div className="notes-add">
                <img src={add} alt="add notes" id="notes-add-icon" />
                <span>Add note</span>
            </div>

            <div className="notes-edit">
                <span id='notes-edit-btn' onClick={()=>setIsEditing(!isEditing)}>
                    {isEditing? 'Done' : 'Edit'}
                </span>
            </div>

            <div className="notes-cards">
                {
                    list.map((item, idx)=>(
                        <div key={idx} className="notes-card-item">
                            <NotesCard />
                            <img onClick={()=>removeItem(idx)} src={remove} 
                                alt="delete" 
                                className={`notes-card-remove ${isEditing? 'reveal' : ''}`} 
                            />
                        </div>
                    ))
                }

            </div>

            {/* <Note /> */}

        </div>
    </div>
  )
}

export default Notes