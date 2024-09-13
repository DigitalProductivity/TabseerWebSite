import React, { useRef } from 'react'
import './css/login.css'
import { Link } from 'react-router-dom';
import LoginForm from './components/loginForms.jsx';
import useWindowDimensions from '../../hooks/useWindowDimensions.jsx';
import { login, logoFull } from '../../assets/images/index.js';
import colors from '../../assets/constants/colors.jsx';
import {useTranslation} from 'react-i18next'
import LanguageSelecter from '../../components/Language/LanguageSelecter.jsx';

 const Login = () => {
   const {width , height}= useWindowDimensions()
  const loginFormRef=useRef(null)
  const formSubmission = () =>{
    if(loginFormRef.current)
    loginFormRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
}
 
const {t}=useTranslation()
  return (

    <div className="row">

        <div className="col-lg-6" style={{backgroundColor:colors.primaryColorLighterShade, padding:"0px"}}>

          <div className="d-flex justify-content-center align-items-center h-100">

            <img src={logoFull} style={{height:"auto" , width:"40%"}}/>

          </div>

        </div>

        <div className="col-lg-6" style={{height:"100vh", paddingLeft:"0px"}}>





              <div className='d-flex flex-column  justify-content-start  h-100' style={{gap:"20%", width:"95%"}} >

                  <div className="d-flex justify-content-end align-items-center" style={{height:"100px"}}>

                    <LanguageSelecter/>

                  </div>

                    <div className=" d-flex flex-column justify-content-center align-items-center gap-5" style={{paddingLeft:"5px"}}>

                        <div className='d-flex justify-content-start'>

                            <div className="d-flex flex-column gap-3">
                                      <h4>{t("Login")}</h4>

                                      <p style={{color:"gray", lineHeight:"30px"}}>{t("LoginDescription")}</p>

                            </div>
                        </div>

                          <div className='w-50 d-flex flex-column gap-3'>


                
                                  <LoginForm  loginFormRef={loginFormRef}/>

                                  <div className='d-flex justify-content-between gap-5'>

                                      <div className='d-flex gap-2'>
                                                <input type='checkbox'></input>
                                                <span>{t("RememberMe")}</span>

                                      </div>

                                      <div>

                                        <Link to='/resetpassword' className='link'> 

                                            <span className='login-reset-password'>{t("Reset password")}</span>

                                        </Link>  

                                      </div>



                                  </div>

                                  <div class='d-flex flex-row justify-content-between mt-5' style={{minWidth:'25vw'}}>

                                              <Link to='/' className='link'><button className='login-back-button'>{t("Back")}</button></Link> 
                                            <button className='login-button' type='submit' onClick={formSubmission}>{t("Login")}</button>

                                  </div>
                            
                                  <div className='d-flex justify-content-center'>

                                      <div className='d-flex gap-2'>

                                          <p>{t("DontHaveAccount")}</p>
                                          
                                          <Link  className='link' to="/register">
                                              <span id='login-re'>{t("Register")}</span>
                                          </Link>

                                      </div>


                                  </div>

                            

                          </div>
                          
                    </div>


              </div>

        </div>

    </div>

    
  )
}
export default Login;