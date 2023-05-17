import React from 'react'
import './notFound.css'
import Sad from '../../assets/aminations/Sad'
import { styles } from '../../utilities/Styling'
import { useGlobalState } from '../../Context'

const NotFound = () => {
    const {bgColorValue:[bgColor]} = useGlobalState();
    const nFStyles={
        background: bgColor,
        color:  bgColor===styles.day? 'black': 'white'
      }
  return (
    <>
    <div style={nFStyles} className='nf'>
        <div className="nf-logo">
            <Sad/>
        </div>
        <div className="nf-text">
            <p id="nf-title">
                404
            </p>
            <p id="nf-caption">
                Page Not Found
            </p>
        </div>

    </div>
    </>
  )
}

export default NotFound