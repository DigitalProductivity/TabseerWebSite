import React, { useEffect, useRef } from 'react'
import colors from '../assets/constants/colors'
import { facebookIcon, linkedinIcon, twitterIcon } from '../assets/images'
import ReusableDropdown from './reusableD'
import { useForm } from 'react-hook-form'
import ReusableTextButton from './reusableTextButton'
import InputTag from './inputTag'
import { useDispatch, useSelector } from 'react-redux'
import { contactUsQuery, fetchUserDetails } from '../core/reducer/User'
import ReusableMessagePopper from './utils/popper/reusableMessagePopper'
import { useTranslation } from 'react-i18next'



function ContactComponent() {
  
const contacUsQuery=useForm()
const individualUserDetails = useSelector(state => state.user?.individualUserDetails)
const contactUsQueryStatus =useSelector(state=>state?.user?.contactUsQueryStatus)
const contactUsformRef =useRef(null)
const{handleSubmit , formState , control}=contacUsQuery
const {t}=useTranslation();
const {errors }=formState
const dispatch= useDispatch();
const problemMappingValues =[
  {
  "problemId":1,
  "problem":t("ProblemWithSession")
},
  {
  "problemId":2,
  "problem":t("Suggestion")
},
  {
  "problemId":3,
  "problem":t("Others")
}
]

const handleSendButtonClick = () =>{
  if(contactUsformRef.current)
  contactUsformRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
}

const contactUsQueryFormSubmission = (data) =>{
 
  const payload ={
    userUuid:individualUserDetails?.lawyerUuid,
    problemType:data?.problem,
    message:data?.description
}

dispatch(contactUsQuery(payload))

}



useEffect(()=>{
 
  dispatch(fetchUserDetails())
},[])

  return (          
      <div className="container-fluid">

              <div className="row" style={{paddingTop:"20px"}}>

                  <div className="col-lg-3">
                  <p style={{fontWeight:'700',fontSize:'18px'}}>{t("ContactUs")}</p>
                  </div>

                  <div className="d-flex justify-content-center">

                    <div className="col-lg-4 col-md-6 col-12">

                        <div className="d-flex flex-column gap-5 ">

                            <form ref={contactUsformRef} onSubmit={handleSubmit(contactUsQueryFormSubmission)} noValidate className='d-flex flex-column justify-content-center align-items-start gap-3' style={{paddingTop:"30px"}}>
                        
                                    <p className='m-0'>{t("Problem/issue")}</p> 

                                    {/* <ReusableDropdown/> */}
                                    <div className='w-100'>
                                      
                                    <ReusableDropdown labelName={""}  name={"problem"} control={control} formInstnace={contacUsQuery} mappingOptionValues={problemMappingValues} rules={{required: t("PleaseSelectIssue") }}/>
                                    <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.problem?.message}</p>
                                    </div>
                                    <div className='w-100'>
            <InputTag inputPlaceholder={t("DescribeYourRequest")} labelName={t("Description")} inputHeight={"150px"} inputName={"description"} formInstance={contacUsQuery} required requiredErrorMessage={t("PleaseAddDescription")}/>
            <p className='m-0' style={{color:"red", fontSize:"12px"}}>{errors.description?.message}</p>
        </div>

                            </form>

                            <div className='d-flex flex-column justify-content-center gap-2 '>

                              <div className='d-flex flex-row justify-content-center'>
                                <ReusableTextButton buttonName={t("send")} backgroundColor={colors.primaryColor} color={"white"} onClick={handleSendButtonClick}/>
                              </div>

                                <div className='d-flex flex-row justify-content-center gap-2'>
                                    <div style={{height:"35px", width:"35px",borderRadius:"10px", backgroundColor:colors.primaryColorLighterShade}} className="d-flex align-items-center justify-content-center">
                                      <img src={facebookIcon} style={{height:"auto", width:"15px"}}/>
                                    </div>
                                    <div style={{height:"35px", width:"35px",borderRadius:"10px", backgroundColor:colors.primaryColorLighterShade}} className="d-flex align-items-center justify-content-center">
                                      <img src={linkedinIcon} style={{height:"auto", width:"15px"}}/>
                                    </div>
                                    <div style={{height:"35px", width:"35px",borderRadius:"10px", backgroundColor:colors.primaryColorLighterShade}} className="d-flex align-items-center justify-content-center">
                                      <img src={twitterIcon} style={{height:"auto", width:"15px"}}/>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                  </div>


              </div>

              {
                contactUsQueryStatus==1000 && (
                  <ReusableMessagePopper message={t("WeGetBackShortly")}/>
                )
              }
      </div> 
  )
}

export default ContactComponent