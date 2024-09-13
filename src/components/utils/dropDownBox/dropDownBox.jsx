import React from 'react'
import "../dropDownBox/dropDownBox.css"

const DropDownBox = (props) => {
  return (

    <div>
      {
        props.isVisible && (
<div className={`animated-box , d-flex , justify-content-center, align-items-center ${props.isVisible ? 'slide-in' : 'slide-out'}`} style={{ height: props.height, width: props.width, backgroundColor: props.backgroundColor || "white", boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" , borderRadius:"5px"}}>

        {props.children}
    </div>
          
        )
      }
    </div>
  )
}

export default DropDownBox