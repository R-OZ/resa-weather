import React from 'react'
import './notFound.css'
import Sad from '../../assets/aminations/Sad'

const NotFound = () => {
  return (
    <>
    <div className='nf'>
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