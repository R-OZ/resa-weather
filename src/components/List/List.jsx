import React from 'react'
import { NavLink } from 'react-router-dom'
import './list.css'
import Card from './Card'
import favorite from '../../assets/icons/love.png'
import explore from '../../assets/icons/explore.png'

const List = ({id, cities}) => {

  return (
    <div className='list-container'>
        <div className="list-title">
            <img id='list-icon' src={id === "explore"? explore: favorite} alt="" />
            <p id="list-text">{id==="explore"? "Explore": "Favorites"}</p>
            <NavLink to={id==='explore'? '/explore':'/favorites'} id="list-edit-btn">Edit</NavLink>
        </div>

        <div className="list-cards">
            {
              cities.map((item, idx)=>(
                <Card key={idx}
                  city_obj={item}
                />
              ))
            }
        </div>

        
    </div>
  )
}

export default List