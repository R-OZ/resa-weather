import React, {useState} from 'react'
import './favorites.css'
import edit from '../../assets/icons/pencil.png'
import done from '../../assets/icons/done.png'
import remove from '../../assets/icons/delete.png'
import Card from '../../components/List/Card'
import { useGlobalState } from '../../Context'

const Explore = () => {
  const [isEditing, setIsEditing] = useState(false)
  const {exploreValue:[exploreList, setExploreList]} = useGlobalState()

  const editSwitch = () =>{
    setIsEditing(!isEditing)
  }

  const removeItem = (index) => {
    setExploreList((prevList) => {
      const newItems = [...prevList];
      newItems.splice(index, 1);
      localStorage.setItem('RESA_explore', JSON.stringify(newItems));
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
          exploreList?.map((item, idx)=>(
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

    </div>
  )
}

export default Explore