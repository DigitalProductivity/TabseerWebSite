import React from 'react'
import '../../components/nxtMsgPopper/reusableNextTogglePopper.css'
import ReusableTextButton from '../reusableTextButton'
import colors from '../../assets/constants/colors'


const ReusableNextTogglePopper = (props) => {
  return (
    <div className='nextTogglePopperContainer d-flex align-items-center h-100'>

        <div style={{height:"23vh" , width:"35vw", backgroundColor:"white" , borderRadius:"5px"}} className='d-flex flex-column gap-3'>

            <div className="h-100">
                <div className='h-50 d-flex justify-content-center align-items-center' >
                    <p className='m-0' style={{fontSize:props.fontSize || "20px"}}>{props.message}</p>
                </div>
                <div className='d-flex justify-content-center gap-5'>
                    <ReusableTextButton backgroundColor={colors.primaryColorLighterShade} buttonWidth={props.buttonWidth} color={colors.primaryColor} buttonName={props.buttonOneName} onClick={props.buttonOneClick}/>
                    <ReusableTextButton backgroundColor={colors.primaryColor} color={"white"} buttonWidth={props.buttonWidth} buttonName={props.buttonTwoName} onClick={props.buttonTwoClick}/>
                </div>
            </div>

        </div>

    </div>
  )
}

export default ReusableNextTogglePopper