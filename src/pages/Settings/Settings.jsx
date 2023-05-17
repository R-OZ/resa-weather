import React, {useEffect, useState} from 'react'
import './settings.css'
import themeIcon from '../../assets/icons/theme.png'
import feedback from '../../assets/icons/feedback.png'
import reset from '../../assets/icons/reset.png'
import { useGlobalState } from '../../Context'
import { styles } from '../../utilities/Styling'


const ThemeOption =({name, color, checkValue, setCheckValue})=>{
    return(
        <label className="theme" htmlFor={name}>
            <input type="radio" name="theme-radio" id={name} defaultChecked={checkValue === name}  />
            <div className={`theme-box ${name==="Dynamic"?'semi-box':''}`} style={{background:color}}></div>
            <p id="theme-name">{name}</p>
        </label>
    )
}

const Settings = () => {
    const [openConfirm, setOpenConfirm] = useState(false)
    const {bgColorValue:[bgColor, setBgColor], themeValue:[theme,setTheme], searchValue:[searchText, setSearchText],favoritesValue: [favoritesList, setFavoritesList],exploreValue: [exploreList, setExploreList],currentCityValue: [currentCity, setCurrentCity],} = useGlobalState()
    const [isLocalStorage, setIsLocalStorage] = useState(localStorage.getItem('RESA_location')) //checks if this key is  no longer available to prove reset
    var checkValue = theme
    const settingsStyles={
        background: bgColor,
        color: bgColor === styles.day? 'black': 'white',
    }
    
    const resetRESA = ()=>{
        localStorage.removeItem('RESA_location')
        localStorage.removeItem('RESA_theme')
        localStorage.removeItem('RESA_bgColor')
        localStorage.removeItem('RESA_explore')
        localStorage.removeItem('RESA_favorites')
        localStorage.removeItem('RESA_currentCity')
        window.location.reload()
    }
    const handleTheme = (themeID)=>{
        setTheme(themeID)
        localStorage.setItem('RESA_theme', themeID)
        if (themeID!=='Dynamic'){
            if(themeID === 'Day'){
                setBgColor(styles.day)
                localStorage.setItem('RESA_bgColor', styles.day)
            }
            else{
                setBgColor(styles.night)
                localStorage.setItem('RESA_bgColor', styles.night)
            }
        }
        console.log(`JUST CHANGED THEME TO ==> ${themeID}`)
    }
  return (
    <div style={settingsStyles} className='settings'>
        <p className="settings-title">Settings</p>
        
        <div className="settings-theme">
            <p className="settings-theme-head">
                <img src={themeIcon} alt="theme-icon" className="settings-theme-icon" />
                <span>Theme</span>
            </p>
            <div className="settings-theme-body">
                <p id="theme-title">Select your preferred theme style for the application:</p>
                <div className="themes">
                    <div onClick={()=>handleTheme('Dynamic')}><ThemeOption checkValue={checkValue} name={'Dynamic'} color={'linear-gradient(45deg, #1c92d2, #abaeae)'}/></div>
                    <div onClick={()=>handleTheme('Day')}><ThemeOption checkValue={checkValue} name={'Day'} color={'linear-gradient(45deg, #1c92d2, #abaeae)'}/></div>
                    <div onClick={()=>handleTheme('Night')}><ThemeOption checkValue={checkValue} name={'Night'} color={'rgb(54, 25, 100)'}/></div>
                </div>
            </div>
        </div>

        <div className="settings-buttons">
            <div onClick={()=>setOpenConfirm(true)} className="settings-reset">
                <img src={reset} alt="reset-icon" id="settings-reset-icon" />
                <p id="settings-button-txt">
                    Reset RESA
                </p>
            </div>
            <a href='https://forms.gle/9pFCSyeV43qLYTtG8' target='_blank' rel="noreferrer">
            <div className="settings-reset">
                <img src={feedback} alt="reset-icon" id="settings-reset-icon" />
                <p id="settings-button-txt">
                    Feedback
                </p>
            </div>
            </a>
        </div>

        <div className={`settings-confirm ${openConfirm? '-reveal': ''}`}>
            <p id="confirm-title">Confirm Reset</p>
            <p id="confirm-caption">Resetting RESA will restore the application to its default settings
            and will erase all previously cached data. e.g favorites and notes</p>          

            <div style={{color: bgColor==styles.day? 'black':'white'}} className="confirm-buttons">
                <div onClick={resetRESA} className="confirm-button">Yes</div>
                <div onClick={()=>setOpenConfirm(false)} className="confirm-button">No</div>
            </div>
        </div>

        {isLocalStorage===null? 
            <div className="settings-confirm -reveal">
                <p id='confirm-title'>Reset Successful</p>
                <p id="confirm-caption" style={{marginTop: '5px', fontSize:'11px'}}>Psst...incase you have not given RESA your location permissions, 
                    navigate to your browser location permissions and reset that too. Then you can go to your homepage on the nav menu.</p>
            </div>
            : null
        }


    </div>
  )
}

export default Settings