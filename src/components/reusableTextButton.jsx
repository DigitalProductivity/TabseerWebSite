import React from 'react'
import commonClassNames from '../assets/constants/commonClassNames'

const ReusableTextButton = (props) => {
  return (
    <div style={{height: props.buttonHeight || "50px",backgroundColor:props.backgroundColor, borderRadius:"5px", width:props.buttonWidth|| "40%" , cursor:'pointer'}} className={commonClassNames.flexJcAc} onClick={props.onClick} >
        <p className='m-0' style={{color:props.color}}>{props.buttonName}</p>
    </div>
  )
}

export default ReusableTextButton