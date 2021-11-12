import React from 'react'
import './Popup.css'
const Popup = (props) => {
    return (
        <div className='popup-background'>
            <div className='popup'>
                <p className={props.details.error?'error-text':'success-text'}>{props.details.message}</p>
            </div>
        </div>
    )
}

export default Popup
