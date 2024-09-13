import React from 'react'
import colors from '../assets/constants/colors'
import { iconSaudiFlag } from '../assets/images'
import { useTranslation } from 'react-i18next'

function MobileNumberInput(props) {

const {t,i18n}=useTranslation();
const isRTL=i18n.dir()==='rlt';
  return (
    <div style={{backgroundColor:"#f6f6f6", height:props.height, width:props.width, borderRadius:props.borderRadius}} className='d-flex flex-row justify-content-evenly align-items-center p-2' dir={isRTL ? 'rtl':'ltr'}>
        <img src={iconSaudiFlag} style={{height:"30px", width:"30px"}}/>

        <p className='m-0' style={{color:colors.primaryColor}}>+966</p>
    </div>
  )
}

export default MobileNumberInput