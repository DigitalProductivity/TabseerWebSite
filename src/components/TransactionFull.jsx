import React,{useEffect, useRef, useState} from 'react'
import '../pages/Wallet/css/PopUp.css'
import DateFormatter from './dateFormatter';
import ReusablePopupHeading from './reusablePopupHeading';
import { useTranslation } from 'react-i18next';
import useOutsideClick from '../hooks/useClickAnywhere';


 const TransactionFull = (props) => {
  const {t}=useTranslation();
  const transactionOutside=useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);
  
  useOutsideClick(transactionOutside, () => {
    if (isOpen) {
      props.onClose();
      setIsOpen(false);
    }
  });

        return (
        
          <div  className='modal-contente'>
            <div ref={transactionOutside}  className='modal-overlay'>
            <div style={{position:'sticky',top:'0px',backgroundColor:'#B48F5A',color:'#ECECEC',padding:'10px'}}>
                      <ReusablePopupHeading popupHeading={t("FullTranscationsHistory")} onClick={props.onClose}/>
              </div>
               
              {props.histroy.map((item, index) => (
                <div className='sts-all' key={index}>
                  <div className='status-date'>
                    <div className='case'>{item.title}</div>
                    <div className='date'><DateFormatter date={item.createdDate}/></div>
                  </div>
                  <div className='sar'>{item.amount}</div>
                </div>
              ))}
            </div>
          </div>
       
        );
      };

export default TransactionFull