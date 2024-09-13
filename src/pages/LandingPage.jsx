import React , {useRef} from 'react';
import LawyerLandingPageNav from '../components/lawyerLandingPageNav';
import LandingPageSectionOne from '../components/landingPageSectionOne';
import LandingPageSectionTwo from '../components/landingPageSectionTwo';
import LawyerLandingPageSectionThree from '../components/lawyerLandingPageSectionThree';
import LandingPageSectionFour from '../components/landingPageSectionFour';
import LawyerLandingPageSectionFive from '../components/lawyerLandingPageSectionFive';
import LawyerLandingPageSectionSix from '../components/lawyerLandingPageSectionSix';
import '../components/lawyerLandingPage.css';
import  {
  logoImage,
  sectionSevenImage,
} from '../assets/constants/images';
import { landingButton, logoFull } from '../assets/images';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function LandingPage() {
  const refs = {
    sectionOneRef: useRef(null),
    sectionTwoRef: useRef(null),
    sectionThreeRef: useRef(null),
    sectionFourRef: useRef(null),
  };

  const navigate=useNavigate();
  
  const handleClick = (refKey) => {
    const ref = refs[refKey];
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleTermsAndCondition=()=>{
    navigate('/terms')
  }
  const handlePrivacyPolicy=()=>{
    navigate('/privacyPolicy')
  }


  const {t}=useTranslation();
  return (
    <>
      <LawyerLandingPageNav generalNav={true} customisedNav={false}  onClick={handleClick}/>

      <div ref={refs.sectionOneRef}>
        <LandingPageSectionOne />
      </div>

      <LandingPageSectionTwo />

      <LawyerLandingPageSectionThree/>

      <div ref={refs.sectionTwoRef}>
        <LandingPageSectionFour /> 
      </div>

      <LawyerLandingPageSectionFive />

      <div ref={refs.sectionThreeRef}>
      <LawyerLandingPageSectionSix />
      </div>

      <div className='container mb-5' style={{ position: 'relative' }}>
        <div
          className='row'
          style={{
            position: 'absolute',
            width: '100%',
            backgroundColor: '#e9e2d7',
            minHeight: '50%',
            bottom: 0,
            zIndex: -1,
          }}
        ></div>

        <div className='row'>
          <div className='col-lg-6 '>
            <div style={{ height: '100%', width: '100%' }}>
              <img
                src={sectionSevenImage}
                style={{ height: '100%', maxWidth: '100%' }}
              />
            </div>
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12'>
            <div className='d-flex align-items-end h-100 pb-5'>
              <div className='d-flex flex-column gap-3 '>
                <h4 style={{ color: '#bb8d4f' }}>{t("SubscribeNewsletter")}</h4>

                <p style={{ color: 'gray' }}>
                  {t("SubscribeDescription")}
                </p>
           
               
                    <div style={{ position: 'relative', width: '70%' }}>
                      <input
                        placeholder={t("EmailPlaceholder")}
                        style={{
                          height: '50px',
                          width: '100%', 
                          borderRadius: '5px',
                          paddingLeft: '10px',
                          paddingRight: "45px",
                        }}
                      />
                      <div style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)' }}>
                        <img src={landingButton} style={{ height: "auto", width: '35px' }} />
                      </div>
                    </div>

             
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={refs.sectionFourRef}>

        <div className='container' style={{ borderTop: '1px solid gray' }}>

          <div className='row pt-5'>

                        <div className='col-lg-4 mb-4 col-sm-12'>

                            <div className='d-flex flex-column gap-2'>
                            <div>
                              <img
                                src={logoFull}
                                style={{ height: 'auto', width: '200px' }}
                              />
                            </div>

                            <div style={{ color: 'gray' }}>
                              <p>
                               {t("ContectDescription")}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-8">

                          <div className="d-flex justify-content-evenly">

                                <div>
                                  <p style={{ color: '#bb8d4f' }}>{t("Contact")}</p>

                                  <div>
                                    <div></div>
                                    <p>9876543210</p>
                                  </div>
                                  <div>
                                    <div></div>
                                    <p>legal@gmail.com</p>
                                  </div>
                                </div>

                                <div>
                                  <p style={{ color: '#bb8d4f' }}>{t("FollowUs")}</p>

                                  <div>
                                    <div></div>
                                    <p>9876543210</p>
                                  </div>
                                  <div>
                                    <div></div>
                                    <p>legal@gmail.com</p>
                                  </div>
                                </div>

                                <div>
                                  <p style={{ color: '#bb8d4f' }}>{t("Policies")}</p>

                                  <div>
                                    <div></div>
                                    <p onClick={handleTermsAndCondition}>{t("TermsCondition")}</p>
                                  </div>
                                  <div>
                                    <div></div>
                                    <p onClick={handlePrivacyPolicy}>{t("PrivacyPolicy")}</p>
                                  </div>
                                </div>

                          </div>

                        </div>

                        {/* <div className='col-lg-2 mb-4 col-sm-12 customBoxPadding'>
                        </div>

                        <div className='col-lg-2 col-sm-12 customBoxPadding'>
                        </div>

                        <div className='col-lg-2 col-sm-12 customBoxPadding'>
                        </div> */}
                        
          </div>

        </div>

      </div>
    </>
  );
}

export default LandingPage;
