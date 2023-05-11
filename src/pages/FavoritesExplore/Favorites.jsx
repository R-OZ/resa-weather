import React, {useState, useEffect} from 'react'
// import './favorites.css'
import './favorites.css'
import edit from '../../assets/icons/pencil.png'
import done from '../../assets/icons/done.png'
import remove from '../../assets/icons/delete.png'
import add from '../../assets/icons/add.png'
import Card from '../../components/List/Card'

const Favorites = () => {
  const [list, setList]= useState([1,2,3,4,5,6,7])
  const [isEditing, setIsEditing] = useState(false)
  const [location, setLocation] = useState(null)
  
  const editSwitch = () =>{
    setIsEditing(!isEditing)
  }

  const removeItem = (index) => {
    setList((prevList) => {
    const newItems = [...prevList];
    newItems.splice(index, 1);
    return newItems;
    });
  };

  const focusSearch =()=>{
    setIsEditing(false)
    document.getElementById('search-text').focus();
  }

  const getLocation=()=>{
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation(position.coords);
        console.log(position.coords)
      },
      error => {
        console.log(error.message);
      }
    );
  }

  useEffect(()=>{
    getLocation()
  }, [])


  return (
    <div className='favorites'>
      
      <img onClick={editSwitch} 
        src={isEditing? done : edit} 
        alt={isEditing? "done" : "edit"} 
        className="favorites-edit-icon" 
      />
      
      <p id="favorites-title">Favorites</p>

      <div className="favorites-cards">
        {
          list.map((item, idx)=>(
            <div key={idx} className="favorites-card-item">
              <Card />
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