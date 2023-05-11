import React, {useState} from 'react'
import './favorites.css'
import edit from '../../assets/icons/pencil.png'
import done from '../../assets/icons/done.png'
import remove from '../../assets/icons/delete.png'
import Card from '../../components/List/Card'

const Explore = () => {
  const [list, setList]= useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
  const [isEditing, setIsEditing] = useState(false)
  
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

  return (
    <div className='favorites'>
      
      <img onClick={editSwitch} 
        src={isEditing? done : edit} 
        alt={isEditing? "done" : "edit"} 
        className="favorites-edit-icon" 
      />
      
      <p id="favorites-title">Explore</p>

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

    </div>
  )
}

export default Explore