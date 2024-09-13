import React, { useEffect, useState } from 'react'
import InputTag from '../../../components/inputTag'
import { useForm } from 'react-hook-form'
import colors from '../../../assets/constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setError } from '../../../core/reducer/User'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import Loader from '../../../components/loaders/loader'



const LoginForm = (props) => {
    const loginAdminForm = useForm()
    const[token, setToken]=  useLocalStorage('token',null )
    const dispatch = useDispatch()
    const {handleSubmit , formState , setError}=loginAdminForm
    const {errors}=formState
    const error = useSelector(state=>state?.user?.error)
    const navigate =useNavigate()
    const loading =useSelector(state=>state.user?.isLoading)
    const {t,i18n}=useTranslation();
    const [isRTL,setIsRTL]=useState(false)
  
    useEffect(()=>{
        const isRTL=i18n.dir() === 'rtl';
      setIsRTL(isRTL)},[i18n.dir()])

    const onLoginFormSubmission = async(data)=>{
        // console.log(data)
        const payload={
            "mobile":data.mobile,
            "password":data.password
        }
    
         const responseData= await dispatch(loginUser(payload))
         setToken(responseData.payload.data.authToken)

    }

    useEffect(()=>{
        
        if(token !==  null){
            navigate('/', { replace: true });
        }
    },[token])

    useEffect(()=>{
        // console.log(error)
        if (error == 1001) {
            setError("mobile", {
              type: "manual",
              message: t("LawyerNotFound"),
            });}
        if (error == 1004) {
            setError("mobile", {
              type: "manual",
              message: t("LawyerVerifiedByAdmin"),
            });}
        if (error == 1005) {
            setError("password", {
              type: "manual",
              message: t("PasswordIncorrect"),
            });}
    },[error])
    
   
  return (
    <>
    <div>
   
    </div>
    <form ref={props.loginFormRef} onSubmit={handleSubmit(onLoginFormSubmission)} noValidate className='w-100 d-flex flex-column gap-3'>
    
         <div style={{width:"100%"}}>

            <div className="d-flex justify-content-center">

                <div style={{width:"100%"}}>
                    
                    <InputTag  inputHeight={"50px"} labelName={t("mobileNumber")}  inputPlaceholder={t("mobileNumberPlaceHolder")}  imageTag={true} inputName={"mobile"} formInstance={loginAdminForm} required requiredErrorMessage={t("MobileNumberIsRequired")} pattern={/^[0-9]+$/} patternErrorMessage={"please enter only number"} maxLength={10}/>
                    <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.mobile?.message}</p>
                   
                 
                </div>

            </div>
        </div>

        <div style={{width:"100%"}}>

            <div className="d-flex flex-column align-items-center">

                <div style={{width:"100%"}}>

                    <InputTag  inputHeight={"50px"} inputType={"password"} labelName={t("Password")}  inputPlaceholder={t("PasswordPlaceHolder")} inputName={"password"} formInstance={loginAdminForm } required requiredErrorMessage={t("PasswordIsRequired")}/>

                    <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.password?.message}</p>

                </div>


            </div>

            {
                loading && <Loader/>
            }

        </div>

    </form>
    </>
  )
}

export default LoginForm