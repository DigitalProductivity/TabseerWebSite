import React from 'react'
import "../../../App.css"
import colors from '../../../assets/constants/colors'
import TermsAndConditionsComponent from './components/termsAndConditionsComponent'
import { useTranslation } from 'react-i18next'


function TersmAndConditionsPage() {

  const {t}=useTranslation();
  return (


      <div  className=' container-fluid'>

        <div style={{ paddingTop:"20px"}}>
          <p style={{fontWeight:'700',fontSize:'18px'}}>{t("TermsAndConditions")}</p>

          <div className=" p-3 termsPageWidthResponsive" style={{backgroundColor:colors.primaryColorLighterShade, borderRadius:"5px"}}>

            <div className='d-flex justify-content-center '>

              <div className="termsPageWidthResponsiveContents" style={{padding:"50px 0px"}}>
     <TermsAndConditionsComponent/>

                

              </div>

            </div>


          </div>

        </div>
  

      </div>



  )
}

export default TersmAndConditionsPage