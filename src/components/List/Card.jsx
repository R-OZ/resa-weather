import React from 'react'
import './card.css'
import { useNavigate  } from 'react-router-dom'
import rain from '../../assets/icons/rain.svg'
import { IconMapper } from '../../utilities/IconMapper'
import { useGlobalState } from '../../Context'

const Card = ({city_obj}) => {
  const {currentCityValue:[currentCity, setCurrentCity]} = useGlobalState()
  const browse = useNavigate()
  
  const handleClick = ()=>{
    setCurrentCity(city_obj)
    localStorage.setItem('RESA_currentCity', JSON.stringify(city_obj))
    browse('/city')
  }
  return (
    <div onClick={handleClick} className='card-container'>
        <div className="card-head">
            <p id="card-city">{city_obj.name}</p>
            <p id="card-country">{city_obj.country}</p>
        </div>

        <div className="card-body">
            <img src={IconMapper(city_obj.weather_text)} alt="rainy" id="card-icon" />
            <div className="card-body-temp">
                <p id="card-temp">{city_obj.temp}&deg;C</p>
                <p id="card-h-l">H:{city_obj.high_temp}&deg; | L:{city_obj.low_temp}&deg;</p>
            </div>
        </div>
        
    </div>
  )
}

export default Card