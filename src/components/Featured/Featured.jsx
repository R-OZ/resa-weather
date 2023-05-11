import React from 'react'
import './featured.css'
import humidty from '../../assets/icons/humidity.png'
import wind from '../../assets/icons/Wind.png'
import { IconMapper } from '../../utilities/IconMapper'

const Featured = ({city, description, weatherID, temperature, high, low, windSpeed, time }) => {
  // const x = IconMapper('cc')
  return (
    <div className='featured-container'>
      <p id="featured-city">New York</p>
      <p id="featured-weather">partly cloudy</p>
      
      <div className="featured-temp-icon">
        <img src={IconMapper('heavy rain')} alt='rain' id="weather"/>
        <h1 style={{fontWeight:400, fontSize:"43px", color:"white"}}>
          17&deg;C
        </h1>
      </div>
      
      <div className="featured-press-wind">
        <p className="press-wind">
          <img src={humidty} alt="" id="featured-icon" />
          <span>26 humidity</span></p>
        <p className="press-wind">
          <img src={wind} alt="" id="featured-icon" />
          <span>SE 13km/h</span></p>
      </div>

      <p className="featured-h-l">
        <span>H:19&deg;</span>
        <div className="line"></div>
        <span>L:15&deg;</span>
      </p>

    </div>
  )
}

export default Featured