import React from 'react'
import './card.css'
import { NavLink } from 'react-router-dom'
import rain from '../../assets/icons/rain.svg'
import { IconMapper } from '../../utilities/IconMapper'

const Card = ({city, country, weatherID, temperature, high, low}) => {
  return (
    <NavLink to='/city/testCity' className='card-container'>
        <div className="card-head">
            <p id="card-city">London</p>
            <p id="card-country">United Kingdom</p>
        </div>

        <div className="card-body">
            <img src={IconMapper('200')} alt="rainy" id="card-icon" />
            <div className="card-body-temp">
                <p id="card-temp">30&deg;C</p>
                <p id="card-h-l">H:37&deg; | L:28&deg;</p>
            </div>
        </div>
        
    </NavLink>
  )
}

export default Card