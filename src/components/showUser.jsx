import React from 'react'
import colors from '../assets/constants/colors'
import { avatarImage, downArrowImage, iconNotificationBell } from '../assets/images'



function ShowUser() {
  return (
  

    <div className="d-flex justify-content-center align-items-center gap-md-3">
    <>
      <img src={avatarImage} style={{ height: "auto", width: "50px", borderRadius: "50%" }} />
    </>

    <div className="d-md-flex gap-md-2">
      <h6 className="m-0 d-none d-md-block" style={{ color: colors.primaryColor }}>User Name</h6>
      <img src={downArrowImage} style={{ height: "auto", width: "25px" }} />
    </div>

    <div style={{height:"35px", width:"35px",borderRadius:"10px", backgroundColor:colors.primaryColorLighterShade}} className="d-none d-md-flex align-items-center justify-content-center">
      <img src={iconNotificationBell} className="align-self-center justify-self-center" style={{ height: "auto", width: "60%" }}/> 
    </div>

    </div>

  )
}

export default ShowUser