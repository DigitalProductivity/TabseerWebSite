import React from 'react';
import '../css/PopUp.css'

const Popup = ({children,widthPopUp}) => 
{
   

  return (
    <div className='popup-container'>
    <div className='popup'>
        {children}
    </div>
    </div>
    
  )
}

export default Popup