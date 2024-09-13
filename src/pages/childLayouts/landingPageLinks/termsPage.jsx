import React from 'react'
import LawyerLandingPageNav from '../../../components/lawyerLandingPageNav'
import FooterComponent from '../../../components/footerComponent'
import {useTranslation} from 'react-i18next'
import colors from '../../../assets/constants/colors'
import TersmAndConditionsPage from '../termsAndConditions/tersmAndConditionsPage'


const TermsPage = () => {

  const {t}=useTranslation()

  return (
    <div className='d-flex flex-column justify-content-between'>

        <div>

            <LawyerLandingPageNav generalNav={false} customisedNav={true}/>

           

    <div className='container'>
    <TersmAndConditionsPage />
    </div>

        </div>

        

        
        <FooterComponent/>


    </div>
  )
}

export default TermsPage