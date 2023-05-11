import React, {useState} from 'react'
import { IconMapper } from '../../utilities/IconMapper'
import './city.css'
import clock from '../../assets/icons/clock.png'
import calendar from '../../assets/icons/calendar.png'
import uv from '../../assets/icons/ultraviolet.png'
import uv2 from '../../assets/icons/ultraviolet2.png'
import uv3 from '../../assets/icons/ultraviolet3.png'
import pressure from '../../assets/icons/pressure.png'
import visibility from '../../assets/icons/eye2.png'
import arrow from '../../assets/icons/arrow.png'
import Featured from '../../components/Featured/Featured'
import Notes from '../../components/Notes/Notes'
import notes from '../../assets/icons/notes.png'
import favorites from '../../assets/icons/love.png'
import temperature from '../../assets/icons/temperature.png'
import temperature2 from '../../assets/icons/temperature2.png'
import wind from '../../assets/icons/wind2.png'
import visibility2 from '../../assets/icons/visibility2.png'
import humidity2 from '../../assets/icons/humidity2.png'

const HourCardIcon =({image, title, data})=>{
  return(
    <div className="city-hour-weather">
      <img src={image} alt="" id="vw" />
      <div className="city-hour-weather-txt">
        <p id="city-hour-weather-title">{title}</p>
        <span>{data}</span>
      </div>
    </div>
  )
}

const CityHourCard =({idx})=>{
  return(
    <div id={`cont${idx}`} className='city-hour-cards'>
      <div  className="city-hour-card">
        <p id="city-hour-time">Thu</p>
        <img src={IconMapper('clear')} alt="" id="city-hour-icon" />
        <p id="city-hour-temp">23&deg;</p>
        <p id="city-hour-temp">Most cloudy</p>
        <img src={arrow} id={`arrow${idx}`} alt="" className="city-hour-arrow" />
        
      </div>
        <div id={`slide${idx}`} className='city-hour-card2'>
          <div className="city-hour-card2-content">
            <HourCardIcon image={humidity2} title={'Humidity'} data={'23'} />
            <HourCardIcon image={wind} title={'Wind'} data={'24km/h'} />
            <HourCardIcon image={visibility2} title={'Visibility'} data={'24km/h'} />
            <HourCardIcon image={uv} title={'UV Index'} data={'4/10'} />
          </div>
          
        </div>
    </div>
  )
}

const CityWeatherIcon =({image, text, detail})=>{
  return(
    <div className="city-weather-item">
      <img src={image} alt="" className='city-weather-icon' />
      <div className="city-weather-txt">
        <p id="city-weather-title">{text}</p>
        <p id='city-weather-desc'>{detail}{image==temperature?<span>&deg;</span>:''}</p>
      </div>
    </div>
  )
}

const handleSelect = (idx)=>{
  var parent = document.getElementById(`cont${idx}`)
  var element = document.getElementById(`slide${idx}`)
  var icon = document.getElementById(`arrow${idx}`)
  parent.classList.toggle('margin-move')
  icon.classList.toggle('flip')
  element.classList.toggle('card2-move')
}

const City = () => {
  const num = [1,2,3,4,5,6]
  return (
    <div className='city'>
      <Notes />
      <img src={favorites} alt="favorites?" id="city-fav-icon" />
      <Featured />

      <div className="city-weather">
        <CityWeatherIcon image={pressure} text={'Pressure'} detail={'1012PS'} />
        <CityWeatherIcon image={uv2} text={'UV Index'} detail={'6/10'} />
        <CityWeatherIcon image={temperature} text={'Feels like'} detail={'13'} />
        <CityWeatherIcon image={visibility} text={'Visibilty'} detail={'24km'} />

      </div>



      <div className="city-hour">
        <p id="city-hour-title">
          <img src={calendar} alt="" id="city-icon" />
          Daily Forecast
        </p>
        
        <div className="city-hour-body">        
          {
            num.map((item, idx)=>(
              <div onClick={()=>handleSelect(idx)} key={idx}>
                <CityHourCard idx={idx} />
              </div>
            ))
          }
        </div>
      </div>

      

    </div>
  )
}

export default City