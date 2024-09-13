import React from 'react'
import colors from '../assets/constants/colors';
import { iconNotificationBell } from '../assets/images';
import ReusableTextButton from './reusableTextButton';

const ReusableNotificationDescriber = (props) => {
    return (
      <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000}}>
            <div className='d-flex flex-column gap-4' style={{background:"white",height:"40vh", width:"50vw", borderRadius:"5px",padding:"15px"}}>

                <div className='d-flex justify-content-center'>
                    <p style={{color:colors.primaryColor, fontSize:"18px"}} className='m-0'>Notifications</p>
                </div>

                <div className='d-flex justify-content-center '>
                    <img src={iconNotificationBell} style={{height:"auto", width:"50px"}}/>
                </div>

                    <div className="d-flex justify-content-center h-100">

                        <div className="h-100" style={{width:"85%"}}>
                                        <div className='d-flex flex-column' style={{background:colors.primaryColorLighterShade, borderRadius:"5px", padding:"10px", minHeight:"100%", maxHeight:"90%"}}>

                                            <div className='d-flex flex-row justify-content-between mb-2' style={{padding:"5px"}}>
                                                <p className='m-0' style={{color:colors.primaryColor}}>Today's message</p>
                                                <p className='m-0' style={{color:colors.secondaryColor}}>{props.time}</p>
                                            </div>

                                            <div style={{minHeight:"90%", maxHeight:"90%", overflowY:"scroll"}}>

                                                <p>{props.displayContents}</p>

                                            </div>
                                        
                                        </div>

                        </div>

                    </div>                
                

                <div className='d-flex flex-row justify-content-center' >
                    <ReusableTextButton buttonName={"Cancel"} backgroundColor={"#e8dccc"} color={colors.secondaryColor} buttonWidth={"100px"} buttonHeight={"30px"}  onClick={props.onClick}  />
                </div>

        

            </div>
      </div>
    );
  }
  

export default ReusableNotificationDescriber