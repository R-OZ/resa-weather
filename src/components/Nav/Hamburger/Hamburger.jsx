import React, {useState} from 'react'
import './hamburger.css'

const Hamburger = ({isOpen, setIsOpen}) => {

  return (
    <div className={`nav-icon ${isOpen? "open": ""}`} onClick={()=>setIsOpen(!isOpen)}>
      <span></span>
      <span></span>
      <span></span>
    </div>

  )
}

export default Hamburger