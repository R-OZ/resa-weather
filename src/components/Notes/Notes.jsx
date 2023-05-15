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
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

const Notes = ({notesList}) => {
    //remember you need to consider the state of the text in the search bar in mobile version so you can use that state to decided a display none for the notes-icon so you wont have icon clashing there.
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const {searchValue, windowWidthValue, favoritesValue:[favoritesList, setFavoritesList], currentCityValue:[currentCity, setCurrentCity] } = useGlobalState()
    const [searchText, setSearchText] = searchValue
    const [currentNote, setCurrentNote] = useState()
    const [openEditor, setOpenEditor] = useState(false)
    
    const notesSwitch =()=>{
        setIsOpen(!isOpen)
    }
    const removeItem = (obj) => {
        const index = currentCity.notes.findIndex(item=> item.id === obj.id)
        let newCurrentCity = _.cloneDeep(currentCity)
        if(index !== -1){
            newCurrentCity.notes.splice(index,1)
            const favCityIndex = favoritesList.findIndex(item=> item.coord === currentCity.coord)
            let newFavoritesList = _.cloneDeep(favoritesList)
            newFavoritesList.splice(favCityIndex, 1, newCurrentCity)
            setFavoritesList(newFavoritesList)
            localStorage.setItem('RESA_favorites', JSON.stringify(newFavoritesList))
            setCurrentCity(newCurrentCity)
            localStorage.setItem('RESA_currentCity', JSON.stringify(newCurrentCity))
        }
    } 
    
    const handleEditor = (obj=null)=>{
        if(obj === null){
            let newNote = {
                id: uuidv4(),
                title: '',
                body: ''
            }
            setCurrentNote(newNote)
        }
        else{
            setCurrentNote(obj)
        }
        setOpenEditor(true)
    }

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
            { !openEditor?
                <>
                    <div className="notes-add" onClick={()=>handleEditor(null)}>
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
                            notesList.map((item, idx)=>(
                                <div key={idx} className="notes-card-item">
                                    <div onClick={()=>handleEditor(item)} style={{width:'100%'}}>
                                        <NotesCard note_obj={item}/>
                                    </div>
                                    <img onClick={()=>removeItem(item)} src={remove} 
                                        alt="delete" 
                                        className={`notes-card-remove ${isEditing? 'reveal' : ''}`} 
                                    />
                                </div>
                            ))
                        }

                    </div>
                </>

            : <Note note_obj={currentNote} openEditor={openEditor} setOpenEditor={setOpenEditor} />
            }

        </div>
    </div>
  )
}

export default Notes