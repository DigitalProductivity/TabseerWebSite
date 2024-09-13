import React , {useEffect, useRef , useState} from 'react'
import colors from '../assets/constants/colors'
import useWindowDimensions from '../hooks/useWindowDimensions'
import InputTag from './inputTag'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtp } from '../core/reducer/User'
import { useForm } from 'react-hook-form'
import ReusableTextButton from './reusableTextButton'
import { useTranslation } from 'react-i18next'



const ReusableOtpComponent = (props) => {
    const{width , height}=useWindowDimensions()
    const dispatch =useDispatch()
    const otpForm=useForm()
    const error = useSelector(state=>state.user.error)
    const {handleSubmit , formState , setFocus , setError}=otpForm
    const {errors}=formState
    const otpFormRef =useRef(null);

  

    const handleVerifyOtpClick = () =>{
        if(otpFormRef.current)
        otpFormRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      }

    const onOtpFormSubmission = (data) =>{
        const otpValue = `${data?.columnOne}${data?.columnTwo}${data?.columnThree}${data?.columnFour}`;
      
        const otpNumber = parseInt(otpValue)
        const payload={
          mobile:props.registeredNumber,
          otp:otpNumber,
        }
        dispatch(verifyOtp(payload))
    }

    useEffect(()=>{

        if(error?.code==1001){
            setError("columnOne"|| "columnTwo"|| "columnThree"||"columnFour", {
                type: "manual",
                message: "Invalid Otp",
              });
        }

    },[error])
      
    const {t}=useTranslation()

  return (
   



        <div className='d-flex flex-column justify-content-center align-items-center h-100 gap-3'>

            <div className="d-flex flex-column justify-content-start w-100 gap-2">

              <h5>{t("VerificationCode")}</h5>
              <p style={{color:"gray"}}>{t("VerificationCodeDescription")} <span style={{color:colors.primaryColor}}>{props.registeredNumber}</span> </p>

            </div>

            <form ref={otpFormRef} onSubmit={handleSubmit(onOtpFormSubmission)} noValidate className='d-flex flex-column gap-5 w-50'>

              <div className="d-flex flex-column justify-content-center align-items-center">

                <div className='d-flex gap-1'>
                      
                      <InputTag maxLength={"1"} inputHeight={"70px"} inputWidth={"70%"} inputPlaceholder={""} inputName={"columnOne"} formInstance={otpForm}  required requiredErrorMessage={t("VerificationError")} paddingLeft={"35px"}/>
                      <InputTag maxLength={"1"}  inputHeight={"70px"} inputWidth={"70%"}   inputPlaceholder={""} inputName={"columnTwo"} formInstance={otpForm}  required requiredErrorMessage={t("VerificationError")}/>
                      <InputTag maxLength={"1"}  inputHeight={"70px"} inputWidth={"70%"} inputPlaceholder={""} inputName={"columnThree"} formInstance={otpForm}  required requiredErrorMessage={t("VerificationError")}/>
                      <InputTag maxLength={"1"}  inputHeight={"70px"} inputWidth={"70%"} inputPlaceholder={""} inputName={"columnFour"} formInstance={otpForm}  required requiredErrorMessage={t("VerificationError")}/>

                </div>

                <p className='m-0' style={{color: "red", fontSize: "14px"}}>

                  {errors.columnOne ? errors.columnOne.message :
                    errors.columnTwo ? errors.columnTwo.message :
                    errors.columnThree ? errors.columnThree.message :
                    errors.columnFour ? errors.columnFour.message : ""}

                </p>

              </div>

                    <div className='d-flex justify-content-center gap-3'>

                        <ReusableTextButton backgroundColor={colors.primaryColorLighterShade} color={colors.primaryColor} buttonName={t("Cancel")} />
                        <ReusableTextButton backgroundColor={colors.primaryColor} color={"white"} buttonName={t("Verify")} onClick={handleVerifyOtpClick}/>

                    </div>


            </form>

            

            <div>
            
            </div>

        </div>




  )
}

export default ReusableOtpComponent