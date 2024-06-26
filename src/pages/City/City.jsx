import React from 'react'
import {useNavigate} from 'react-router-dom'
import { IconMapper } from '../../utilities/IconMapper'
import './city.css'
import calendar from '../../assets/icons/calendar.png'
import uvIcon from '../../assets/icons/ultraviolet.png'
import uv2 from '../../assets/icons/ultraviolet2.png'
import pressureIcon from '../../assets/icons/pressure.png'
import visibility from '../../assets/icons/eye2.png'
import arrow from '../../assets/icons/arrow.png'
import Featured from '../../components/Featured/Featured'
import Notes from '../../components/Notes/Notes'
import favorites from '../../assets/icons/love.png'
import temperature from '../../assets/icons/temperature.png'
import windIcon from '../../assets/icons/wind2.png'
import visibility2 from '../../assets/icons/visibility2.png'
import humidity2 from '../../assets/icons/humidity2.png'
import Loading from '../../components/Loading/Loading'
import { useGlobalState } from '../../Context'
import _ from 'lodash'
import { styles } from '../../utilities/Styling'

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

const CityHourCard =({idx, day, temp, weather, humidity, wind, visibility, uv})=>{
  return(
    <div id={`cont${idx}`} className='city-hour-cards'>
      <div  className="city-hour-card">
        <p id="city-hour-time">{day}</p>
        <img src={IconMapper(weather)} alt="" id="city-hour-icon" />
        <p id="city-hour-temp">{temp}&deg;</p>
        <p id="city-hour-weather" className='city-hour-weather-desc'>{weather}</p>
        <img src={arrow} id={`arrow${idx}`} alt="" className="city-hour-arrow" />
        
      </div>
        <div id={`slide${idx}`} className='city-hour-card2'>
          <div className="city-hour-card2-content">
            <HourCardIcon image={humidity2} title={'Humidity'} data={humidity} />
            <HourCardIcon image={windIcon} title={'Wind'} data={wind} />
            <HourCardIcon image={visibility2} title={'Visibility'} data={visibility} />
            <HourCardIcon image={uvIcon} title={'UV Index'} data={uv} />
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
        <p id='city-weather-desc'>{detail}{image===temperature?<span>&deg;</span>:''}</p>
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
  const {globalLoadingValue:[globalLoading], themeValue:[theme], currentCityValue:[currentCity], geoLocationValue:[geoLocation], favoritesValue:[favoritesList]} = useGlobalState()
  const browse = useNavigate()
  const currentCity2 = currentCity ?? (geoLocation === '-1' ? false : geoLocation);
  const isFavorites = favoritesList.findIndex(item=> (item.name === currentCity2.name && item.country === currentCity2.country)) //check if city is fav to show fav-icon(heart)
  
  if(currentCity2 === false){
    browse('/current-city-not-set')
  }

  const cityStyles = {
    background: theme==='Dynamic'? (currentCity2.isDay? styles.day : styles.night) : (theme==='Day'? styles.day: styles.night),
    color: theme==='Dynamic'? (currentCity2.isDay? 'black': 'white') : (theme==='Day'? 'black' : 'white')
  }
  return (
    <>
    {
      globalLoading? 
      <div style={cityStyles} className='city'>
          <Loading/>
      </div>
    :
      <div style={cityStyles} className='city'>
        {
          currentCity2.notes?
            <>
              <Notes notesList={currentCity2.notes}/>
              {isFavorites !== -1? <img src={favorites} alt="favorites?" id="city-fav-icon" />: null}
            </>
          : null
        }

        <Featured 
          city={currentCity2.name}
          description={currentCity2.weather_text}
          temperature={currentCity2.temp}
          high={currentCity2.high_temp}
          low={currentCity2.low_temp}
          windSpeed={currentCity2.wind}
          humidty={currentCity2.humidity}
        />

        <div className="city-weather">
          <CityWeatherIcon image={pressureIcon} text={'Pressure'} detail={`${currentCity2.pressure}MB`} />
          <CityWeatherIcon image={uv2} text={'UV Index'} detail={currentCity2.uv} />
          <CityWeatherIcon image={temperature} text={'Feels like'} detail={currentCity2.feelslike} />
          <CityWeatherIcon image={visibility} text={'Visibilty'} detail={currentCity2.visibility} />

        </div>

        <div className="city-hour">
          <p id="city-hour-title">
            <img src={calendar} alt="" id="city-icon" />
            Daily Forecast
          </p>
          
          <div className="city-hour-body">        
            {
              currentCity2.forecast.map((item, idx)=>(
                <div onClick={()=>handleSelect(idx)} key={idx}>
                  <CityHourCard idx={idx} 
                  day={item.dayOfWeek}
                  temp={item.avg_temp}
                  weather={item.weather_text}
                  humidity={item.avg_humidity}
                  wind={item.max_wind}
                  visibility={item.avg_visibility}
                  uv={item.uv}
                  />
                </div>
              ))
            }
          </div>
        </div>

      </div>
    }
    </>
  )
}

export default City