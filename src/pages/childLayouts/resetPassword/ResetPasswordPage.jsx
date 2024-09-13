import React, { useEffect, useRef, useState } from 'react'
import { logoFull } from '../../../assets/images'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import LanguageSelecter from '../../../components/Language/LanguageSelecter'
import InputTag from '../../../components/inputTag'
import { useForm } from 'react-hook-form';
import ReusableTextButton from '../../../components/reusableTextButton'
import colors from '../../../assets/constants/colors'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../../core/reducer/User'
import ReusableOtpComponent from '../../../components/reusableOtpComponent'
import SetPasswordForms from '../../Register/components/setPassword'
import Loader from '../../../components/loaders/loader'
import ReusableMessagePopper from '../../../components/utils/popper/reusableMessagePopper'
import { useTranslation } from 'react-i18next'
import OtpInput from '../../../components/otp'



const ResetPasswordPage = () => {
    const [sectionOne,setSectionOne]=useState(true)
    const [sectionTwo,setSectionTwo]=useState(false)
    const [sectionThree,setSectionThree]=useState(false)
    const[mobileNumber , setMobileNumber]=useState(null)
    const {width , height}=useWindowDimensions()
    const loading = useSelector(state=>state.user?.isLoading)
    const resetPasswordForm = useForm();
    const {handleSubmit , formState , control, setError, clearErrors}=resetPasswordForm
    const {errors}=formState
    const resetPasswordMobileformRef=useRef(null);
    const errorTrigger = useSelector(state=>state.user?.error)
    const forgotPasswordStatus =useSelector(state=>state.user?.forgotPasswordStatus)
    const otpResponse=useSelector(state=>state.user.otpStatus)
    const passwordStatus =useSelector(state=>state.user?.passwordSetStatus)
    const dispatch =useDispatch()
    const navigate=useNavigate();
   
   

  const handleNav=()=>{
      navigate('/login')

  }



  const mobileNumberFormSubmission = () =>{
    if(resetPasswordMobileformRef.current)
    resetPasswordMobileformRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
}

const onSubmit = (data) =>{
  setMobileNumber(data?.mobile)
  const payload = {
    mobile:data?.mobile
  }

  dispatch(forgotPassword(payload))


}


useEffect(()=>{
  const errorStatus = errorTrigger?.code

  if(errorStatus==1001){
    setError("mobile", {
      type: "manual",
      message: "mobile number does not exists",
    });
  }
},[errorTrigger])


useEffect(()=>{

  if(forgotPasswordStatus==1000){
    setSectionOne(false)
    setSectionTwo(true)
  }

},[forgotPasswordStatus])

useEffect(()=>{

  if(otpResponse==1000){
    setSectionTwo(false)
    setSectionThree(true)
  }

},[otpResponse])

useEffect(()=>{

if(passwordStatus==1000){
  
  setTimeout(()=>{
  setSectionOne(true)
  setSectionTwo(false)
  setSectionThree(false)
  navigate('/login')
  window.location.reload();
},2000)
}

},[passwordStatus])


useEffect(() => {
  const handlePopState = (event) => {
      console.log('Back or forward button was clicked', event.state);
     
  };

  window.addEventListener('popstate', handlePopState);

  return () => {
      window.removeEventListener('popstate', handlePopState);
  };
}, []);


const {t}=useTranslation();
  return (
    <div className='row'>
        <div  className='col-lg-6' style={{backgroundColor:'#F8F4EF',height:height}}>

                <div className="d-flex justify-content-center align-items-center h-100">
                    <img src={logoFull} style={{height:"auto", width:"40%"}} />
               </div>

         </div>

         <div className='col-lg-6'>


                   <div className="d-flex justify-content-end align-items-center" style={{height:"100px"}}>

                    <LanguageSelecter/>
                  </div>

        
          <div className="d-flex flex-column justify-content-center align-items-center " style={{height:'90vh'}}>
        {
            sectionOne && (

              <div className='w-100 d-flex flex-column gap-3'>
                <h5>{t("ResetPassword")}</h5>
                <p style={{fontSize:"17px",color:colors.secondaryColor}}>{t("Please_enter_your_registered_mobile_number_to_receive_OTP")}</p>
<div className="d-flex flex-row justify-content-center">
           <div style={{width:'50%'}} className='d-flex flex-column gap-3'>

                <form ref={resetPasswordMobileformRef} onSubmit={handleSubmit(onSubmit)} noValidate>

                  <div className='d-flex flex-column gap-2'>
                        <InputTag labelName={t("")}imageHeight={"55px"} inputHeight={"55px"} inputPlaceholder={t("mobileNumberPlaceHolder")} imageTag={true} inputName={"mobile"} formInstance={resetPasswordForm} required requiredErrorMessage={t("MobileNumberIsRequired")} pattern={/^[0-9]+$/} patternErrorMessage={t("pleaseNumber")} maxLength={10}/>
                        <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.mobile?.message}</p>
                    
                  </div>

                </form>
                <div className="d-flex flex-row justify-content-center">

       <div className="w-75">
                <div className='d-flex flex-row  gap-4 justify-content-center align-items-center mt-4'>
                    <ReusableTextButton buttonName={t("Back")} color={colors.primaryColor} backgroundColor={colors.primaryColorLighterShade}  buttonWidth={'55%'} onClick={()=>handleNav()}  />
                    <ReusableTextButton buttonName={t("send")} color={"white"} backgroundColor={colors.primaryColor} buttonWidth={'55%'} onClick={mobileNumberFormSubmission} /> 
                </div>

        </div>         
                </div>

            </div>

</div>
                </div>

            )
        }

        {
          sectionTwo &&(
             
  
                
              
              <OtpInput registeredNumber={mobileNumber}/>
             
          )
        }

        {
          sectionThree &&(
            <>
                          <SetPasswordForms registeredNumber={mobileNumber} buttonContainerWidth={"70%"} heading={t("ResetPassword")} headingSubPara={t("Please_enter_a_new_password_for_your_account")} defaultButtonNeeded={true} resetPage={true}/>
                          
            </>
          )
        }
        </div>

        
        {
          loading && <Loader/>
        }

        {
            passwordStatus == 1000 &&(
                <ReusableMessagePopper message={t("password_updated_successfully.please_login_again")} />
            )
        }

</div>
    </div>
  )
}

export default ResetPasswordPage