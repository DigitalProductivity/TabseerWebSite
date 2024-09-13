import React from 'react'

import { Link } from 'react-router-dom'
import '../css/enterotp.css'
import{useState} from 'react'
import headerLogo from '../assets/image/headerLogo.png'


const EnterOtp = () => {


 
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
    const [isCodeVerified, setIsCodeVerified] = useState(false);
  
    const handleCodeChange = (index, value) => {
      const newCode = [...verificationCode];
      newCode[index] = value.replace(/[^0-9]/g, '');
      setVerificationCode(newCode);
    };
  
    const handleVerifyCode = () => {
      const enteredCode = verificationCode.join('');
  
  
      const isVerified = enteredCode === '1234';
      setIsCodeVerified(isVerified);
  
    
    };
  
    
  return (
    <div className='container-fluid'>
    <div className="row">

    <div className='col-lg-6  enter-otp-left-container' style={{backgroundColor:'#F8F4EF',minHeight:'100vh'}}>


    </div>


    <div className='col-lg-6  enter-otp-right-container'>

    <div className='enter-otp-header-logo mb-4'>
                    <img src={headerLogo}
                    width={274}
                    height={80}
                    alt='image not found'></img>
               </div>

    <div className=' mx-1'>
          <p className='text-start'>Reset Password</p>
          <p className='text-start'>Lorem ipsum dolor sit amet consectetur. Massa integer turpis sed adipiscing.</p>
    </div>

    <div className='d-flex flex-column align-items-center w-50 container mt-5'>
     <div className=' container d-flex flex-column gap-4 mb-3'>
 <label htmlFor="text" className="mt-2 d-flex align-items-center justify-content-center">01:59</label>
    <div className='enter-otp-input'>
    {verificationCode.map((digit, index) => (

        <input type='text'
         key={index}
            maxLength="1"
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}

        ></input> ))}
    </div>
    </div>   

    
    <div className='d-flex flex-row justify-content-around mt-4  enter-otp-all-buttons'>
    <Link to='/resetpassword' className='link'>
    <button id='enter-otp-back-button'>Back</button>
    </Link>


   <button id='enter-otp-button'
    onClick={handleVerifyCode}
   
   >Verify</button>   
  
    </div>

    
    
  {/* <div className='enter-otp-code-verifid'>
{isCodeVerified ? 
 (<p>code successfully verified</p>)
       : (<p>not match</p>) }
      </div>  */}

<div class=" mt-3  enter-otp-resend" style={{width:'100vw'}}>
      <p className='d-flex flex-row'>Didn't receive the code? <button >Resend</button></p>
      </div>     

    </div>

    

</div>
</div>
</div>
  )
}

export default EnterOtp;