import React from 'react';
import '../components/lawyerLandingPage.css';
import images, {
  appStoreIcon,
  playStoreIcon,
  spiralArrow,
} from '../assets/constants/images';
import { landingPageSectionOneImage, sectionOneMainImage } from '../assets/images';
import { useTranslation } from 'react-i18next';

function LandingPageSectionOne(props) {

  const {t}=useTranslation();
  return (
    <div
      className='container-fluid'
      style={{
        background:
          'linear-gradient(90deg, rgba(233,226,215,0.5) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <div className='container sectionOne'>
        <div className='row'>
          <div className='col-lg-6 col-md-12'>
            <div className=' d-flex justify-content-center align-items-center h-100'>
              <div>
                <h1 className='sectionOneHeading'>
                  {t("EmpowerYour")}{' '}
                  <span style={{ color: '#B48F5A' }}> {t("LegalJourney")} </span>
                  {t("withExpertAdvice")}
                </h1>

                <p className='sectionOneParagraph'>
                {t("EmpowerDescription")}
                </p>

                <div
                  className='d-flex align-items-center gap-lg-3 gap-3'
                  style={{ width: '100%' }}
                >
                  <div
                    className='d-flex'
                    style={{
                      backgroundColor: 'black',
                      padding: '5px',
                      borderRadius: '5px',
                      height: '50px',
                      width: '160px',
                    }}
                  >
                    <>
                      <img
                        src={appStoreIcon}
                        style={{ height: '40px', width: '40px' }}
                      />
                    </>

                    <div className='d-flex flex-column'>
                      <p
                        className='mb-0'
                        style={{
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}
                      >
                        {t("Download")}
                      </p>
                      <p
                        className='mb-0'
                        style={{
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '500',
                        }}
                      >
                        {t("AppStore")}
                      </p>
                    </div>
                  </div>

                  <div
                    className='d-flex'
                    style={{
                      backgroundColor: 'black',
                      padding: '5px',
                      borderRadius: '5px',
                      height: '50px',
                      width: '160px',
                    }}
                  >
                    <>
                      <img
                        src={playStoreIcon}
                        style={{ height: '40px', width: '40px' }}
                      />
                    </>

                    <div className='d-flex flex-column'>
                      <p
                        className='mb-0'
                        style={{
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '500',
                        }}
                      >
                        {t("GETITON")}
                      </p>
                      <p
                        className='mb-0'
                        style={{
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '500',
                        }}
                      >
                        {t("GooglePlay")}
                      </p>
                    </div>
                  </div>

                  <div className='d-none d-md-block'>
                    <img
                      src={spiralArrow}
                      style={{ height: 'auto', width: '200px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-6 col-md-12'>
            <div className='d-flex justify-content-center align-items-center w-100'>
              <img
                src={landingPageSectionOneImage}
                style={{
                  height: 'auto',
                  maxWidth: '100%',
                  alignSelf: 'center',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageSectionOne;
