import React, { useEffect } from 'react'
import './css/register.css';
import{useState,useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegisterForm from './components/RegisterForm';
import ReusableTextButton from '../../components/reusableTextButton';
import colors from '../../assets/constants/colors';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { logoFull } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputTag from '../../components/inputTag';
import { verifyOtp } from '../../core/reducer/User';
import SetPasswordForms from './components/setPassword';
import Loader from '../../components/loaders/loader';
import LanguageSelecter from '../../components/Language/LanguageSelecter';
import { useTranslation } from 'react-i18next';
import OtpInput from '../../components/otp';
import TermsAndConditionsComponent from '../childLayouts/termsAndConditions/components/termsAndConditionsComponent';
import ReusableModal from '../../components/modal/reusableModal';
import BgHolder from '../../components/bgHolder/bgHolder';
import ReusableMessagePopper from '../../components/utils/popper/reusableMessagePopper';

const Register = () => {

  const {width , height}=useWindowDimensions()
  const [registerSection , setRegisterSection]=useState(true)
  const [otpSection , setOtpSection]=useState(false)
  const[termsAndConditionsSection,setTermsAndConditionsSection]=useState(false)
  const loading = useSelector((state)=>state?.user?.isLoading)
  const RegisterStatusCode = useSelector(state=>state.claims?.claimPatchStatusCode)
  
  const [registeredNumber , setRegisteredNumber]=useState(null)
  const formRef =useRef(null);
  const otpFormRef =useRef(null);
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const [passSection ,setPassSection ]=useState(false)
  const otpForm =useForm()
  const dispatch =useDispatch()
  const {handleSubmit , formState , setFocus}=otpForm
  const {errors, isValid}=formState
  const addUserStatus =useSelector(state =>state.user.addUserStatus)
  const otpResponse=useSelector(state=>state.user.otpStatus)
  const userFileUploadStatus = useSelector(state=>state.user?.userFileUploadStatus)
  const navigate=useNavigate();
  const [uploadError ,setUploadError]=useState(false)
  
  const formSubmission = () =>{
    
    if(formRef.current)
    formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
}



const termsFormDenialClick =() =>{
  setRegisterSection(true)
  setTermsAndConditionsSection(false)
}

  
    useEffect(() => {
      if (firstInputRef?.current?.value.length == 1) {
        setFocus(secondInputRef);
      }
    }, [setFocus]);


  

const handleNav=()=>{
  navigate('/')
}

const handleTermsAcceptionClick =()=>{
  if(userFileUploadStatus==1000){
    setOtpSection(true)
    setTermsAndConditionsSection(false)
    setRegisterSection(false)

  }

}

useEffect(()=>{
    if( userFileUploadStatus==1000){
      setTermsAndConditionsSection(true)
    }
},[ userFileUploadStatus])

useEffect(()=>{
  if(otpResponse==1000){
    setRegisterSection(false)
        setOtpSection(false)
        setPassSection(true)
  }
},[otpResponse])

const onOtpFormSubmission = (data) =>{
  const otpValue = `${data?.columnOne}${data?.columnTwo}${data?.columnThree}${data?.columnFour}`;

  const otpNumber = parseInt(otpValue)
  const payload={
    mobile:registeredNumber,
    otp:otpNumber,
  }
  dispatch(verifyOtp(payload))
}

const handleVerifyOtpClick = () =>{
  if(otpFormRef.current)
  otpFormRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
}

const {t}=useTranslation()



  return (
    <>
          {
            registerSection && (
              
                  <div className="container-fluid">

                    <div className="row">
                  
                        <div  className='col-lg-6' style={{backgroundColor:'#F8F4EF',height:height}}>

                              <div className="d-flex justify-content-center align-items-center h-100">
                                  <img src={logoFull} style={{height:"auto", width:"40%"}} />
                              </div>

                        </div>
                          
                        <div className='col-lg-6' style={{height:'100vh',overflowY:'auto'}}>

                            <div className="d-flex flex-column justify-content-end align-items-center gap-4" style={{width:'95%'}}>

                            <div className="d-flex justify-content-end align-items-center w-100" style={{height:"100px"}}>

                                <LanguageSelecter/>


                                </div>

                                
                                      <div className='d-flex flex-column gap-2 w-100'>
                                            <h5>{t("Register")}</h5>
                                            <p style={{color:"gray", lineHeight:"25px"}}>{t("RegisterDescription")}</p>
                                      </div>

                                

                                <div className="d-flex flex-column gap-2">

                                    
                            
                                        <RegisterForm formRef={formRef} setRegisteredNumber={setRegisteredNumber} setTermsAndConditionsSection={setTermsAndConditionsSection} termsAndConditionsSection={termsAndConditionsSection} uploadError={uploadError} setUploadError={setUploadError}/>
                              


                                      <div className='d-flex flex-row w-100 gap-5 align-items-center justify-content-center mt-3 mb-3'>

                                      
                                      
                                        <ReusableTextButton buttonName={t("Back")} color={colors.primaryColor} backgroundColor={colors.primaryColorLighterShade}  buttonWidth={'35%'} onClick={()=>handleNav()} />
                                        <ReusableTextButton buttonName={t("Register")} color={"white"} backgroundColor={colors.primaryColor} buttonWidth={'35%'} onClick={formSubmission} /> 
                                      </div>

                                      <div className='d-flex justify-content-center gap-2'>

                                          <p>{t("AlreadyAccount")}</p>

                                          <Link to='/login' className='link'> <p>{t("Login")}</p> </Link>

                                      </div>

                                </div>

                            </div>




                        </div>
                  
                  
                    </div>

                  </div>
            )
          }

          {
            termsAndConditionsSection &&(
      <BgHolder>
             
                <div className="d-flex flex-row justify-content-center">
                  <div className="w-75">
                    <TermsAndConditionsComponent/>
                  </div>
                </div>
<div className='d-flex flex-row justify-content-center gap-3'>

                <ReusableTextButton buttonName={t("Deny")} backgroundColor={colors.primaryColorLighterShade} buttonWidth={"150px"} color={colors.primaryColor} onClick={termsFormDenialClick}/>
                <ReusableTextButton buttonName={t("Accept")} backgroundColor={colors.primaryColor} buttonWidth={"150px"} color={"white"} onClick={handleTermsAcceptionClick}/>
</div>
           
        
      </BgHolder>  

   

            )
          }

          {
            otpSection && (

              
              <div className="row">

          
                  <div className="col-lg-6" style={{backgroundColor:colors.primaryColorLighterShade, height:height}}>
                      <div className="d-flex justify-content-center align-items-center h-100">
                          <img src={logoFull} style={{height:"auto", width:"40%"}} />
                      </div>
                  </div>

                  <div className="col-lg-6">
                  
<div className="d-flex align-items-center h-100">

                  <OtpInput registeredNumber={registeredNumber}/>
</div>

                  </div>

              </div>
            )
          }

          {
            passSection && registeredNumber ? (
              <div className="row">
                  <div className="col-lg-6" style={{backgroundColor:colors.primaryColorLighterShade, height:height}}>
                      <div className="d-flex justify-content-center align-items-center h-100">
                          <img src={logoFull} style={{height:"auto", width:"40%"}} />
                      </div>
                  </div>

                <div className="col-lg-6 d-flex justify-content-center align-items-center">

                  <SetPasswordForms otherPage={true} gap={"20px"} setPassButtonWidth={"170px"} height={"50%"} registeredNumber={registeredNumber} heading={"Set password"} headingSubPara={"please set a password for your account to finish the registration process"}/>

                </div>

              </div>
            ): ""
          }

          {
            loading && <Loader/>
          }

    </>

    
  )
}

export default Register;