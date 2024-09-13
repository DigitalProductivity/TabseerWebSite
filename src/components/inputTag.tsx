import React, { useEffect, useState } from 'react'
import MobileNumberInput from './mobileNumberInput'
import colors from '../assets/constants/colors'
import { iconEyeClose, iconEyeOpen } from '../assets/images';
import { useTranslation } from 'react-i18next';

function InputTag(props:any) {

  const{register}= props.formInstance
  const restrictedEmails = ["lawyerAdmin@gmail.com", "admin@gmail.com", "lawyerAdmin3@gmail.com", "lawyerAdmin4@gmail.com", "lawyerAdmin5@gmail.com", "superadmin@tabseer.com"];
  const restrictedEmailServiceProviders=['protonMail.com', 'provider2.com', 'provider3.com'];
  const [passwordVisible, setPasswordVisible]=useState(false)

  const {t,i18n}=useTranslation();
  const [isRTL,setIsRTL]=useState(false)

  useEffect(()=>{
      const isRTL=i18n.dir() === 'rtl';
    setIsRTL(isRTL)
  }
    ,
    [i18n.dir()])
  
  return (
    <div className='d-flex flex-column gap-2'>
      <div className="d-flex justify-content-start">
        <p className='m-0' style={{fontSize :props.labelFontSize || "15px" , color:props.color || "black"}}>{props.labelName}</p>

      </div>

        {
          props.imageTag && (
            <div className='d-flex flex-row gap-2'>

{isRTL &&(
<>

<input disabled={props.disabled || false} placeholder={props.inputPlaceholder} style={{height:props.inputHeight || "45px", width:props.inputWidth || "100%", border:`${props.borderWidth || "2px"} ${props.borderType || "solid"} ${props.borderColor || colors.secondaryColorLighterShade}`, borderRadius:props.borderRadius || "5px",paddingLeft:"10px",paddingRight:"10px"}}  {...register(props.inputName,{
  required:props.required ? props.requiredErrorMessage : false ,
  pattern: props.pattern ? {
    value: props.pattern,
    message: props.patternErrorMessage
  } : undefined
})} id={props.inputName}
maxLength={props.maxLength !== undefined ? props.maxLength : null}
/>
<MobileNumberInput height={props.imageHeight || "45px"} width={"80px"}/>
</>

)}

{
  !isRTL &&(

    <>

<MobileNumberInput height={props.imageHeight || "45px"} width={"80px"}/>
<input disabled={props.disabled || false} placeholder={props.inputPlaceholder} style={{height:props.inputHeight || "45px", width:props.inputWidth || "100%", border:`${props.borderWidth || "2px"} ${props.borderType || "solid"} ${props.borderColor || colors.secondaryColorLighterShade}`, borderRadius:props.borderRadius || "5px",paddingLeft:"10px",paddingRight:"10px"}}  {...register(props.inputName,{
  required:props.required ? props.requiredErrorMessage : false ,
  pattern: props.pattern ? {
    value: props.pattern,
    message: props.patternErrorMessage
  } : undefined
})} id={props.inputName}
maxLength={props.maxLength !== undefined ? props.maxLength : null}
/>
</>

  )
}

            </div>
            )
        }

        {
          !props.imageTag && (

          
              <div style={{position:"relative"}}>
                <input  type={
                  props.inputType === "password"
                    ? passwordVisible
                      ? "text"
                      : "password"
                    : props.inputType || "text"
                } disabled={props.disabled ||false} placeholder={props.inputPlaceholder} style={{height:props.inputHeight || "45px", width:props.inputWidth || "100%", border:`${props.borderWidth || "2px"} ${props.borderType || "solid"} ${props.borderColor || colors.secondaryColorLighterShade}`, borderRadius:props.borderRadius || "5px", backgroundColor: props.backgroundColor || "default", paddingLeft:props.paddingLeft ||"10px", paddingRight:"10px", position:"relative"}} {...register(props.inputName,{
    
                required:props.required ? props.requiredErrorMessage : false ,
    
                pattern: props.pattern ? {
                  value: props.pattern,
                  message: props.patternErrorMessage
                } : undefined ,
                minLength:props.minLength ?{
                  value:props.minLength,
                  message: props.minLengthErrorMessage
                }:undefined,
                validate: props.validate ? {
                notAdmin: (fieldValue: any) => {
                  return restrictedEmails.includes(fieldValue) ? "Please enter a different email address" : true;
                },
    
                notBlackListed: (fieldValue:any) => {
                 
                  const domain = fieldValue.split('@')[1];
                
                  
                  const restrictedProviders = restrictedEmailServiceProviders
                
                 
                  return restrictedProviders.includes(domain)
                    ? "Please enter an email address with different service provider"
                    : true;
                }
                
              }
            : undefined
        })} id={props.inputName}
        maxLength={props.maxLength !== undefined ? props.maxLength : null}
        minLength={props.minLength !== undefined ? props.minLength : null}/>

{
  props.inputType == 'password' && (
    <div 
      style={{
        position: 'absolute',
        right: isRTL?"":'10px',
        left: isRTL?"10px":'',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
      }}
      onClick={() => { setPasswordVisible(!passwordVisible); }}
    >

      {passwordVisible ? (
        <img src={iconEyeOpen} style={{height:"auto", width:"20px"}}/>
      ) : (
        <img src={iconEyeClose} style={{height:"auto", width:"20px"}}/>
      )}
    </div>
  )
}
              </div>

          )
        }

    </div>
  )
}

export default InputTag