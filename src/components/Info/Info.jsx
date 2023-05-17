import React from 'react'
import './info.css'
import { NavLink } from 'react-router-dom'
import add from '../../assets/icons/add.png'
import add2 from '../../assets/icons/add2.png'
import { styles } from '../../utilities/Styling'
import { useGlobalState } from '../../Context'

const Info = () => {
  const {bgColorValue:[bgColor]} = useGlobalState()
  const InfoStyles={
    background: bgColor,
    color:  bgColor==styles.day? 'black': 'white'
  }
  return (
    <div style={InfoStyles}>
        <p className="info-title">Oops...Nothing To Show Here</p>
        <p className="info-caption">Start personalizing your weather app to wake up your homepage</p>

        <NavLink to='/favorites' className="info-favorites">
          <img src={add} alt="add" id="info-icon" />
          <span>Add to favorites</span>
        </NavLink>
    </div>
  )
}

export default Info