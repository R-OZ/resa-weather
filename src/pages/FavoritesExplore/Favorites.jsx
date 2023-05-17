import React, {useState, useEffect} from 'react'
import './favorites.css'
import edit from '../../assets/icons/pencil.png'
import done from '../../assets/icons/done.png'
import remove from '../../assets/icons/delete.png'
import add from '../../assets/icons/add.png'
import Card from '../../components/List/Card'
import { useGlobalState } from '../../Context'
import { styles } from '../../utilities/Styling'

const Favorites = () => {
  const [isEditing, setIsEditing] = useState(false)
  const {favoritesValue:[favoritesList, setFavoritesList], bgColorValue:[bgColor]} = useGlobalState()
  
  const editSwitch = () =>{
    setIsEditing(!isEditing)
  }
  const favStyles={
    background: bgColor,
    color:  bgColor===styles.day? 'black': 'white'
  }

  const removeItem = (index) => {
    setFavoritesList((prevList) => {
      const newItems = [...prevList];
      newItems.splice(index, 1);
      localStorage.setItem('RESA_favorites', JSON.stringify(newItems));
      return newItems;
    });
  };

  const focusSearch =()=>{
    setIsEditing(false)
    document.getElementById('search-text').focus();
  }


  return (
    <div style={favStyles} className='favorites'>
      
      <img onClick={editSwitch} 
        src={isEditing? done : edit} 
        alt={isEditing? "done" : "edit"} 
        className="favorites-edit-icon" 
      />
      
      <p id="favorites-title">Favorites</p>

      <div className="favorites-cards">
        {
          favoritesList?.map((item, idx)=>(
            <div key={idx} className="favorites-card-item">
              <Card key={idx}
                city_obj={item}
              />
              <img onClick={()=>removeItem(idx)} src={remove} 
                alt="delete" 
                className={`favorites-remove ${isEditing? 'reveal' : ''}`} 
              />
            </div>
          ))
        }
      </div>

      <img src={add} onClick={focusSearch} alt="add" id="favorites-add" />

    </div>
  )
}

export default Favorites