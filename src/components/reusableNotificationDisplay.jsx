import React, { useState } from 'react'
import colors from '../assets/constants/colors'


const ReusableNotificationDisplay = (props) => {


    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    

  return (
    <div style={{background:colors.primaryColorLighterShade, borderRadius:"10px", padding:"15px", height:"95px"}} className='d-flex flex-row justify-content-between' onClick={props.onClick}>

        <div className='d-flex flex-row align-items-center gap-3'>

            <div style={{background:"#ddcab3", height:"50px", width:"50px", borderRadius:"50%"}} className='d-flex justify-content-center align-items-center'>
                <img src={props.imageSource} style={{height:"30px", width:"30px"}}/>
            </div>

            <div className='d-flex flex-column gap-1 justify-content-center'>
                <p style={{color:colors.primaryColor, fontSize:"18px"}}>{props.notificationHeading}</p>

                <p className='m-0' style={{color:colors.secondaryColor}}>{truncateText(props.notificationPara, 30)}</p>
            </div>

        </div>

        <div className='d-flex flex-row align-items-start'>
            <p className='m-0' style={{color:colors.secondaryColor}}>{props.time}</p>
        </div>

      

    </div>
  )
}

export default ReusableNotificationDisplay