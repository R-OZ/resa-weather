import React, {useEffect, useState} from 'react'
import './welcome.css'
import Smiley from '../../assets/aminations/Smiley'
import favorites from '../../assets/icons/love.png'
import explore from '../../assets/icons/explore.png'
import notes from '../../assets/icons/notes.png'
import theme from '../../assets/icons/theme.png'
import { useGlobalState } from '../../Context'
import {useNavigate} from 'react-router-dom'
import { CityWeather } from '../../api/CityWeather'

const WelcomeIcon =({image, title, body})=>{
    return(
      <div className="welcome-icon-container">
        <img src={image} alt="" id="welcome-icon" />
        <div className="welcome-icon-txt">
          <p id="welcome-icon-title">{title}</p>
          <span>{body}</span>
        </div>
      </div>
    )
}
const Welcome = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const {globalLoadingValue:[globalLoading, setGlobalLoading], geoLocationValue:[geoLocation, setGeoLocation], currentCityValue:[currentCity, setCurrentCity]} = useGlobalState()
  
  const getLocation = ()=>{
    navigator.geolocation.getCurrentPosition(
      position  => {
        CityWeather(`${position.coords.latitude.toString()},${position.coords.longitude.toString()}`)
          .then(res =>{
            localStorage.setItem('RESA_location', JSON.stringify(res))
            setGeoLocation(res)
            navigate('/city')
          })
          .catch(err=> {console.log(err); setMessage(err)})
      },
      error => {
        console.log(error.message);
        localStorage.setItem('RESA_location', "-1")
        setGeoLocation("-1")
      }
    );
  }
  useEffect(()=>{
    getLocation();
  },[])
  return (
    <>
    <div className='welcome'>
        <div className="welcome-cover"></div>
        <div className="welcome-logo">
            <Smiley/>
        </div>
        <div className="welcome-text">
            <p id="welcome-title">
                Welcome To RESA
            </p>
            <p id="welcome-caption">
                Your personalized weather application
            </p>
        </div>


        <div className="welcome-feature">
            <p id="welcome-feature-title">
                Features
            </p>
            <div className="welcome-features">
                {
                  message===null?
                  <>
                    <WelcomeIcon image={explore} title={'Explore'} body={"View the weather of 15 largest cities by default"} />
                    <WelcomeIcon image={favorites} title={'Favorites'} body={'Personalize your list of your favorites cities'} />
                    <WelcomeIcon image={notes} title={'Note'} body={'Manage your notes for each of your favorite cities'} />
                    <WelcomeIcon image={theme} title={'Dynamic Themes'} body={'Theme changes day/night in respect to the city'} />
                  </>
                  : <h1>{message}</h1>
                
                }

            </div>
        </div>
    </div>
    </>
  )
}
export default Welcome