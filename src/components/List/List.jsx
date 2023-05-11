import React from 'react'
import { NavLink } from 'react-router-dom'
import './list.css'
import Card from './Card'
import favorite from '../../assets/icons/love.png'
import explore from '../../assets/icons/explore.png'

const List = ({id, cities, num}) => {

  return (
    <div className='list-container'>
        <div className="list-title">
            <img id='list-icon' src={id === "explore"? explore: favorite} alt="" />
            <p id="list-text">{id==="explore"? "Explore": "Favorites"}</p>
            <NavLink to={id==='explore'? '/explore':'/favorites'} className="list-edit-btn">Edit</NavLink>
        </div>

        <div className="list-cards">
            {
              num.map(()=>(
                <Card />
              ))
            }
        </div>

        
    </div>
  )
}

export default List