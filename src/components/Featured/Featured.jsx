import React from 'react'
import './featured.css'
import humidtyIcon from '../../assets/icons/humidity.png'
import wind from '../../assets/icons/Wind.png'
import { IconMapper } from '../../utilities/IconMapper'
import { CityWeather } from '../../api/CityWeather'
import { SearchCity } from '../../api/SearchCity'


const Featured = ({city, description, temperature, high, low, windSpeed, humidty}) => {
  // const x = IconMapper('cc')
  return (
    <div className='featured-container'>
      <p id="featured-city">{city}</p>
      <p id="featured-weather">{description}</p>
      
      <div className="featured-temp-icon">
        <img src={IconMapper(description)} alt='rain' id="weather"/>
        <h1 style={{fontWeight:400, fontSize:"43px", color:"white"}}>
          {temperature}&deg;C
        </h1>
      </div>
      
      <div className="featured-press-wind">
        <p className="press-wind">
          <img src={humidtyIcon} alt="" id="featured-icon" />
          <span>{humidty} humidity</span></p>
        <p className="press-wind">
          <img src={wind} alt="" id="featured-icon" />
          <span>{windSpeed}</span></p>
      </div>

      <p className="featured-h-l">
        <span>H:{high}&deg;</span>
        <span className="line"></span>
        <span>L:{low}&deg;</span>
      </p>

    </div>
  )
}

export default Featured