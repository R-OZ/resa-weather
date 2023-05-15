import React, {useState} from 'react'
import './settings.css'
import theme from '../../assets/icons/theme.png'
import feedback from '../../assets/icons/feedback.png'
import reset from '../../assets/icons/reset.png'
import { useGlobalState } from '../../Context'
import { useNavigate } from 'react-router-dom'


const ThemeOption =({name, color, checkValue, setCheckValue})=>{
    return(
        <label onClick={()=>setCheckValue(name)} className="theme" htmlFor={name}>
            <input type="radio" name="theme-radio" id={name} checked={checkValue === name}  />
            <div className={`theme-box ${name==="Dynamic"?'semi-box':''}`} style={{background:color}}></div>
            <p id="theme-name">{name}</p>
        </label>
    )
}

const Settings = () => {
    const [openConfirm, setOpenConfirm] = useState(false)
    const [checkValue, setCheckValue] = useState('Day')
    const browse = useNavigate()
    // const {} = useGlobalState()

    const resetRESA = ()=>{
        localStorage.removeItem('RESA_location')
        localStorage.removeItem('RESA_explore')
        localStorage.removeItem('RESA_favorites')
        localStorage.removeItem('RESA_currentCity')
        browse('/')
        window.location.reload()
    }
  return (
    <div className='settings'>
        <p className="settings-title">Settings</p>
        
        <div className="settings-theme">
            <p className="settings-theme-head">
                <img src={theme} alt="theme-icon" className="settings-theme-icon" />
                <span>Theme</span>
            </p>
            <div className="settings-theme-body">
                <p id="theme-title">Select your preferred theme style for the application:</p>
                <div className="themes">
                    <ThemeOption checkValue={checkValue} setCheckValue={setCheckValue} name={'Dynamic'} color={'linear-gradient(45deg, #1c92d2, #abaeae)'}/>
                    <ThemeOption checkValue={checkValue} setCheckValue={setCheckValue} name={'Day'} color={'linear-gradient(45deg, #1c92d2, #abaeae)'}/>
                    <ThemeOption checkValue={checkValue} setCheckValue={setCheckValue} name={'Night'} color={'rgb(54, 25, 100)'}/>
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
            <div className="settings-reset">
                <img src={feedback} alt="reset-icon" id="settings-reset-icon" />
                <p id="settings-button-txt">
                    Feedback
                </p>
            </div>
        </div>

        <div className={`settings-confirm ${openConfirm? '-reveal': ''}`}>
            <p id="confirm-title">Confirm Reset</p>
            <p id="confirm-caption">Resetting RESA will restore the application to its default settings
            and will erase all previously cached data. e.g favorites and notes</p>          

            <div className="confirm-buttons">
                <div onClick={resetRESA} className="confirm-button">Yes</div>
                <div onClick={()=>setOpenConfirm(false)} className="confirm-button">No</div>
            </div>
        </div>

    </div>
  )
}

export default Settings