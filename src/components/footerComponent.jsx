import React, { useState } from 'react'
import { logoFull } from '../assets/images'
import { useNavigate } from 'react-router-dom'


const FooterComponent = () => {

    const navigate= useNavigate()

    const handleTermsAndCondition=()=>{
        navigate('/terms')
      }

      const handlePrivacyPolicy =() =>{
        navigate('/privacyPolicy')
      }

  return (
    <div >

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
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Inventore, beatae aliquid harum doloremque
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8">

                  <div className="d-flex justify-content-evenly">

                        <div>
                          <p style={{ color: '#bb8d4f' }}>Contact</p>

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
                          <p style={{ color: '#bb8d4f' }}>Follow Us</p>

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
                          <p style={{ color: '#bb8d4f' }}>Policies</p>

                          <div>
                            <div></div>
                            <p onClick={handleTermsAndCondition}>Terms & Condition</p>
                          </div>
                          <div>
                            <div></div>
                            <p onClick={handlePrivacyPolicy}>Privacy Policy</p>
                          </div>
                        </div>

                  </div>

                </div>

                
  </div>

</div>

      </div>
  )
}

export default FooterComponent