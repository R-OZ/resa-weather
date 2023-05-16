import React, {useState} from 'react'
import './note.css'
import save from '../../assets/icons/done.png'
import back from '../../assets/icons/back.png'
import bin from '../../assets/icons/bin.png'
import bin2 from '../../assets/icons/bin2.png'
import { useGlobalState } from '../../Context'
import _ from 'lodash'


const Note = ({note_obj, openEditor, setOpenEditor}) => {
    //please beware that the id for both the input and the texarea per note must be unique, to avoid html issues
    const {favoritesValue: [favoritesList, setFavoritesList], exploreValue: [exploreList, setExploreList], currentCityValue:[currentCity, setCurrentCity]} = useGlobalState()
    const [note, setNote] = useState({
        id: note_obj.id,
        title: note_obj.title,
        body: note_obj.body
    })

    const goBack =()=>{
        setOpenEditor(false)
    }
    const saveNote =(obj)=>{
        //check if note was there before in list or not. : therefore its either a create note or an update note
        if (obj.title.length + obj.body.length>0){ //check if not is not empty
            const exisitingIndex = currentCity.notes.findIndex(item=> item.id === obj.id)
            let newCurrentCity = _.cloneDeep(currentCity)
            if(exisitingIndex !== -1){
                newCurrentCity.notes.splice(exisitingIndex, 1)
                newCurrentCity.notes.unshift(obj)
            }
            else{
                newCurrentCity.notes.unshift(obj)
            }
            //check which list the city exists in, either explore or fav
            const favCityIndex = favoritesList.findIndex(item=> item.coord === currentCity.coord)
            const expCityIndex = exploreList.findIndex(item => item.coord === currentCity.coord)
            if (expCityIndex == -1){
                //does not exist in explore then must exist in fav
                let newFavoritesList = _.cloneDeep(favoritesList)
                newFavoritesList.splice(favCityIndex, 1, newCurrentCity)
                setFavoritesList(newFavoritesList)
                localStorage.setItem('RESA_favorites', JSON.stringify(newFavoritesList))
                
            }
            else{
                //exists in explore
                let newExploreList = _.cloneDeep(exploreList)
                newExploreList.splice(expCityIndex,1,newCurrentCity)
                setExploreList(newExploreList)
                localStorage.setItem('RESA_explore', JSON.stringify(newExploreList))
            }
            setCurrentCity(newCurrentCity)
            localStorage.setItem('RESA_currentCity', JSON.stringify(newCurrentCity))
        }
        goBack()
    }
    const deleteNote = (obj)=>{
        const exisitingIndex = currentCity.notes.findIndex(item=> item.id === obj.id)
        let newCurrentCity = _.cloneDeep(currentCity)
        if(exisitingIndex !== -1){
            newCurrentCity.notes.splice(exisitingIndex, 1)
            const favCityIndex = favoritesList.findIndex(item=> item.coord === currentCity.coord)
            const expCityIndex = exploreList.findIndex(item => item.coord === currentCity.coord)
            if(expCityIndex===-1){
                let newFavoritesList = _.cloneDeep(favoritesList)
                newFavoritesList.splice(favCityIndex, 1, newCurrentCity)
                setFavoritesList(newFavoritesList)
                localStorage.setItem('RESA_favorites', JSON.stringify(newFavoritesList))
            }
            else{
                let newExploreList = _.cloneDeep(exploreList)
                newExploreList.splice(expCityIndex,1,newCurrentCity)
                setExploreList(newExploreList)
                localStorage.setItem('RESA_explore', JSON.stringify(newExploreList))
            }
            setCurrentCity(newCurrentCity)
            localStorage.setItem('RESA_currentCity', JSON.stringify(newCurrentCity))
        }
        goBack()
    }
  return (
    <>
    <div onClick={()=>saveNote(note)} className="notes-save-btn">
        <img src={save}  alt="save notes" id='notes-save' />
        <span>Save note</span>
    </div>
    
    <div className='note'>
        <input type="text" 
            placeholder='Title' 
            id={`note-title-${note.id}`} 
            value={note.title} 
            name="note-title" 
            className="note-title" 
            onChange={(e)=>setNote((prev)=>({...prev, title: e.target.value}))} 
        />

        <textarea 
            name="note-body" 
            id={`note-body-${note.id}`} 
            value={note.body} 
            placeholder='Start typing your notes ...' 
            className="note-body"
            onChange={(e)=>setNote((prev)=>({...prev, body: e.target.value}))} >

        </textarea>
    </div>
    <div className="note-btns">
        <div onClick={goBack} className="back-delete">
            <img src={back} alt="save notes" id='notes-back-save' />
            <p>Back to notes</p>
        </div>
        <div onClick={()=>deleteNote(note)} className="back-delete">
            <img src={bin} alt="save notes" id='notes-back-save' />
            <p>Delete note</p>
        </div>
    </div>
    </>
  )
}

export default Note