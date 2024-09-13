import React from 'react'
import colors from '../assets/constants/colors'
import images from '../assets/constants/images'
import commonClassNames from '../assets/constants/commonClassNames'
import { iconDeleteXMark } from '../assets/images'

const ReusablePopupHeading = (props) => {
   
  return (
    <>
          <div className={commonClassNames.flexJbAc}>

            <p className="m-0">{props.popupHeading}</p>

            <div style={{ backgroundColor: colors.primaryColorLighterShade,height: "50px",width: "50px",borderRadius: "5px"}} className={commonClassNames.flexJcAc} onClick={props.onClick}>
                    <img src={iconDeleteXMark} style={{ height: "25px", width: "25px",cursor:'pointer' }}/>
            </div>
      </div>
    </>
  )
}

export default ReusablePopupHeading