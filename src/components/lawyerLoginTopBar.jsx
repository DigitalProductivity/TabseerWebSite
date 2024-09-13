import React, { useEffect } from 'react'
import colors from '../assets/constants/colors'
import images, { logoImage } from '../assets/constants/images'
import ShowUser from './showUser'
import { useDispatch } from "react-redux";
import useWindowDimensions from './useWindowDimensions';
import { hamBurgerMenuIcon, logoMobile } from '../assets/images';




function LawyerLoginTopBar() {

  const dispatch = useDispatch()
  const { width, height } = useWindowDimensions();

  const toggleReduxAction =()=>{
    dispatch(setTriggerFunctionCall())
  }

  return (
    <div className="container-fluid" style={{borderBottom:`2px solid ${colors.secondaryColorLighterShade}`, paddingTop:"5px", paddingBottom:"5px"}}>

      <div className=" d-flex justify-content-between">

              <div className="d-flex justify-content-center align-items-center d-lg-none ">
                <img src={hamBurgerMenuIcon} style={{height:"auto", width:"30px"}} onClick={toggleReduxAction}/>
              </div>
          
              <>
               <img src={ width <= 576 ?logoMobile : logoImage} style={{ height: "auto", width: width <= 576 ? "50px" : "200px" }}/> 
              </>

              <>
                  <div className="d-flex justify-content-end align-items-center h-100">
                    <ShowUser />
                  </div>
              </>
      </div>

    </div>
  )
}

export default LawyerLoginTopBar