import React, {useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import './nav.css'
import Hamburger from './Hamburger/Hamburger'
import home from '../../assets/icons/home.png'
import search from '../../assets/icons/search2.png'
import favorites from '../../assets/icons/love.png'
import settings from '../../assets/icons/settings.png'
import { useGlobalState } from '../../Context'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {windowWidthValue} = useGlobalState();

  const closeMenu =()=>{
    setIsOpen(false);
  }
  
  useEffect(() => {
    if ( isOpen && windowWidthValue<1024) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  return (
    <>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className={`nav-cover ${isOpen? 'show': ''}`}></div>
      
      
      <div className={`nav-drawer ${isOpen? "move":""}`}>
        <NavLink to='/' onClick={closeMenu} className="nav-menu">
          <img src={home} alt="home-icon" id="menu-icon" />
          <span>Home</span>
        </NavLink>
        <NavLink to='/favorites' onClick={closeMenu} className="nav-menu">
          <img src={favorites} alt="favorites-icon" id="menu-icon" />
          <span>Favorites</span>
        </NavLink>
        <div className="nav-menu">
          <img src={settings} alt="settings-icon" id="menu-icon" />
          <span>Settings</span>
          </div>
      </div>
    </>
  )
}

export default Nav