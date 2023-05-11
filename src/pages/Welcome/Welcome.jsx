import React from 'react'
import './welcome.css'
import Smiley from '../../assets/aminations/Smiley'
import favorites from '../../assets/icons/love.png'
import explore from '../../assets/icons/explore.png'
import notes from '../../assets/icons/notes.png'
import theme from '../../assets/icons/theme.png'

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
                <WelcomeIcon image={explore} title={'Explore'} body={"View the weather of 15 largest cities by default"} />
                <WelcomeIcon image={favorites} title={'Favorites'} body={'Personalize your list of your favorites cities'} />
                <WelcomeIcon image={notes} title={'Note'} body={'Manage your notes for each of your favorite cities'} />
                <WelcomeIcon image={theme} title={'Dynamic Themes'} body={'Theme changes day/night in respect to the city'} />

            </div>
        </div>
    </div>
    </>
  )
}
export default Welcome