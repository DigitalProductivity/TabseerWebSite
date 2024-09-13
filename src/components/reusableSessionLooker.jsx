import React from 'react'
import colors from '../assets/constants/colors'
import ReusableTag from './reusableTag'
import InteractionTypeTag from './interactionTypeTag'
import ReusableClockTimingConverterTag from './reusableClockTimingConverterTag'

const ReusableSessionLooker = (props) => {
  return (
    <div className='col-lg-12'  style={{border:`2px solid ${colors.primaryColorLighterShade}`, borderRadius:"5px", padding:'10px'}}>

        <div className="d-flex flex-column gap-3">

            <div className="d-flex flex-row justify-content-center mb-3">
                <ReusableTag slotBookingStatus={props.slotBookingStatus}/>
            </div>

            <div className='mb-3 d-flex flex-row justify-content-center'>
                <InteractionTypeTag interactionType={props.interactionType}/>
            </div>

            <div className="d-flex flex-row justify-content-center" style={{border:`2px solid ${colors.primaryColorLighterShade}`, borderRadius:"5px",padding:"10px"}}>

            <ReusableClockTimingConverterTag time={props?.time}/>
            </div>


        </div>
    </div>
  )
}

export default ReusableSessionLooker