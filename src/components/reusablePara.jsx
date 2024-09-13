import React from 'react'
import colors from '../assets/constants/colors'

const ReusablePara = (props) => {
   

  
    return (

      <div>
          <h4 style={{color:colors.primaryColor}}>{props.heading}</h4>
          <p style={{color:colors.secondaryColor, fontSize:"15px", lineHeight:"30px"}}>{props.para}</p>
      </div>

    )
  }

export default ReusablePara