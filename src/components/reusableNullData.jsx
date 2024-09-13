import React from 'react'
import { iconNullData } from '../assets/images'

const ReusableNullData = (props) => {
  return (
    
    <div style={{height:props.height || "100px" , width:props.width || "100%"}} className='d-flex flex-column align-items-center justify-content-center gap-2'>
        <img src={iconNullData} style={{height:props.nullImageHeight || "auto" , width:props.nullImageWidth || "100px"}}/>
        <p className='m-0'>{props.nullMessage}</p>
    </div>
  )
}

export default ReusableNullData