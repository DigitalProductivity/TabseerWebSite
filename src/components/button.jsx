import React from 'react'

function Button(props) {
  return (

        <button style={{color:props.color , backgroundColor:props.backgroundColor ,  padding: `${props.paddingVertical}px ${props.paddingHorizontal}px`, cursor:"pointer" , border:"none"}}>{props.buttonName}</button>
   
  )
}

export default Button