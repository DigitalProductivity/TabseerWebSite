import React  from 'react'
import images from '../assets/constants/images'
import { sectionThreePlaceholder, tickMarkIcon } from '../assets/images'
import { useTranslation } from 'react-i18next'


function LawyerLandingPageSectionThree() {
  
const {t}=useTranslation();
  return (
    <div  className="container sectionOne mb-5" >

    <div className="row h-100">

        <div className="col-lg-6 h-100">
            <div className="d-flex justify-content-center align-items-end h-100">
               <img src={sectionThreePlaceholder} style={{height:"auto",width:"100%"}}/>
            </div>

        </div>

        <div className="col-lg-6 h-100">

            <div className="d-flex flex-column justify-content-end h-100 gap-4">

                <h5>{t("Features")}</h5>

                <ul style={{listStyleType:"none",gap:"10px",display:"flex",flexDirection:"column"}}>

                    <li style={{lineHeight:"30px",color:"gray"}}>

                        <div className='d-flex gap-3'>

                            <div>
                                <img src={tickMarkIcon} style={{height:"auto", width:"25px"}}/>
                            </div>

                            <div>
                                <p>
                                    {t("FeaturesOne")}
                                </p>
                            </div>

                        </div> 
                        
                    </li>

                    <li style={{lineHeight:"30px",color:"gray"}}>

                        <div className='d-flex gap-3'>

                            <div>
                                <img src={tickMarkIcon} style={{height:"auto", width:"25px"}}/>
                            </div>

                            <div>
                                <p>
                                    {t("FeaturesTwo")}
                                </p>
                            </div>

                        </div>
                        
                    </li>

                    <li style={{lineHeight:"30px",color:"gray"}}>

                        <div className='d-flex gap-3'>

                            <div>
                                <img src={tickMarkIcon} style={{height:"auto", width:"25px"}}/>
                            </div>

                            <div>
                                <p>
                                    {t("FeaturesThree")}
                                </p>
                            </div>

                        </div>
                    
                    </li>

                    <li style={{lineHeight:"30px",color:"gray"}}>

                         <div className='d-flex gap-3'>

                                <div>
                                    <img src={tickMarkIcon} style={{height:"auto", width:"25px"}}/>
                                </div>

                                <div>
                                    <p>
                                        {t("FeaturesFour")}
                                    </p>
                                </div>

                        </div>
                        
                    </li>

                    <li style={{lineHeight:"30px",color:"gray"}}>

                        <div className='d-flex gap-3'>

                                <div>
                                    <img src={tickMarkIcon} style={{height:"auto", width:"25px"}}/>
                                </div>

                                <div>
                                    <p>
                                        {t("FeaturesFive")}
                                    </p>
                                </div>

                        </div>
                        
                    </li>

                    <li style={{lineHeight:"30px",color:"gray"}}>

                        <div className='d-flex gap-3'>

                                <div>
                                    <img src={tickMarkIcon} style={{height:"auto", width:"25px"}}/>
                                </div>

                                <div>
                                    <p>
                                        {t("FeaturesSix")}
                                    </p>
                                </div>

                        </div>
                      
                    </li>

                </ul>

            </div>
            

        </div>

    </div>

</div>
  )
}

export default LawyerLandingPageSectionThree