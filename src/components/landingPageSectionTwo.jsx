import React ,{useRef} from 'react'
import "../components/lawyerLandingPage.css"
import { useTranslation } from 'react-i18next'

function LandingPageSectionTwo(props) {

    const {t}=useTranslation();
  return (
    <div className="container-fluid" style={{backgroundColor:"#B48F5A",padding:"70px 0"}} >

            <div className="container">
                <div className="row d-flex justify-content-evenly">

                    <div className="col-lg-2 col-md-6 mb-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
                            <div  className=" d-flex justify-content-center">

                                <h2 className="text-light">2000+</h2>
                            </div>
                        
                            <div className=" d-flex justify-content-center">
                                <h6 className="text-light">{t("Lawyers")}</h6>

                            </div>
                        
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
                                <div  className="w-100 d-flex justify-content-center">

                                    <h2 className="text-light">2000+</h2>
                                </div>
                            
                                <div className="w-100 d-flex justify-content-center">
                                    <h6 className="text-light">{t("Users")}</h6>

                                </div>
                            
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
                                <div  className="w-100 d-flex justify-content-center">

                                    <h2 className="text-light">2000+</h2>
                                </div>
                            
                                <div className="w-100 d-flex justify-content-center">
                                    <h6 className="text-light">{t("AudioSessions")}</h6>

                                </div>
                            
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
                                <div  className="w-100 d-flex justify-content-center">

                                    <h2 className="text-light">2000+</h2>
                                </div>
                            
                                <div className="w-100 d-flex justify-content-center">
                                    <h6 className="text-light">{t("VideoSessions")}</h6>

                                </div>
                            
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-3">
                                <div  className="w-100 d-flex justify-content-center">

                                    <h2 className="text-light">2000+</h2>
                                </div>
                            
                                <div className="w-100 d-flex justify-content-center">
                                    <h6 className="text-light">{t("ChatSessions")}</h6>

                                </div>
                            
                        </div>
                    </div>

                </div>

            </div>
       
    </div>
  )
}

export default LandingPageSectionTwo