import React, { useState, useEffect } from 'react';
import "../popper/reusableMessagePopper.css"
import colors from '../../../assets/constants/colors';
import { iconSuccessTick } from '../../../assets/images';
import { useTranslation } from 'react-i18next';

const ReusableMessagePopper = ({ message, onComplete }) => {
  const [showComponents, setShowComponents] = useState(true);


  const {t}=useTranslation();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowComponents(false);
      
      
      setTimeout(() => {
        
        if (onComplete) {
          onComplete();
        } else {
          window.location.reload();
        }
      }, 600);
    }, 2000); 


    return () => clearTimeout(timeoutId);
  }, [onComplete]); 

  return (
    <div className='popperContainer' style={{ zIndex: 100 }}>
      {showComponents && (
        <div style={{ height: "40vh", width: "30vw", backgroundColor: "white", borderRadius: "5px" }} className='d-flex flex-column gap-2 justify-content-center align-items-center'>
          <img src={iconSuccessTick} style={{ height: "auto", width: "10%" }} />
          <p style={{ fontSize: "40px" }}>{t("Awesome")}</p>
          <p className='m-0' style={{ fontSize: "20px", color: colors.primaryColor, fontWeight: "bold" }}>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ReusableMessagePopper;
