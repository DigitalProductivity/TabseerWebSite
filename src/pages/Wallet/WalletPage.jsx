import React, { useState,useEffect } from 'react';
import  './css/walletpage.css'
import TransactionsHistory from '../../components/TransactionsHistory'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory } from '../../core/reducer/User'
import { amountUpW, moneytransfer, walletIcon, walletWallet, wifi } from '../../assets/images';
import { useTranslation } from 'react-i18next';
import colors from '../../assets/constants/colors';


const WalletPage = () => {
  const dispatch = useDispatch();
  const wallet=useSelector(state=> state.user.wallet)
  const allwallet=useSelector(state=> state.user.allwallet)
  
 

  useEffect(() => {
  
    dispatch(fetchTransactionHistory);
  }, []);

  const {t}=useTranslation()
  return (
    <div className='container-fluid'>
    <div className='row'>
    <h6 className='container-fluid mt-3 mb-3' style={{color:'#434345',fontSize:18,fontWeight:600}}>{t("Wallet")}</h6>
    
   

    <div className='d-flex flex-row gap-2'>
    <div className='d-flex flex-column' style={{minWidth:'35vw',height:'36vh',backgroundColor:'#F8F4EF',border:'1px solid #F8F4EF',borderRadius:'8px'}}>
    <div className='wallet-first-wrapper'>
    <div className='d-flex px-3 justify-content-between align-items-center' style={{height:'10vh',maxWidth:'30vw'}}>
    <div className='d-flex align-items-center'>
    <div className='d-flex justify-content-center align-items-center' style={{width:'45px',height:'45px',border:`1px solid ${colors.primaryColorLighterShade}`,backgroundColor:colors.primaryColor,borderRadius:'100%'}}>
      <img src={walletWallet} style={{width:'30px',height:'25px'}}/>
    </div>
    <div  style={{color:'#434345',fontSize:'18px',fontWeight:700,padding:'10px'}}>{t("MyWallet")}</div> 
    </div>
    <div className='wallet-wifi'>
    <img  src={wifi}
    width={30}
    alt='image not found'
    height={30}
    />
    </div>
    </div>
    
    <div className='wallet-name-license'>
    <div className='wallet-name'>
    <div style={{color:'#818182',fontSize:14,fontWeight:400}}>{t("Name")}</div>
    <div style={{color:'#434345',fontSize:14,fontWeight:400}}>{wallet?.lawyerName}</div>
    </div>
    <div className='wallet-license-id'>
    <div style={{color:'#818182',fontSize:14,fontWeight:400}}>{t("LicenseID")}</div>
    <div style={{color:'#434345',fontSize:14,fontWeight:400}}>{wallet?.nationalId}</div>
    </div>
    </div>
    <div className='wallet-totalbalance'>
    <div style={{color:'#818182',fontSize:14,fontWeight:400}}>{t("TotalBalance")}</div>
    <div style={{color:'#434345',fontSize: 20,fontWeight:700}}>{allwallet?.lawyerWalletBalance}</div>
    </div>
    </div>
    </div>

    <div className='wallet-second-container'>
    <div className='wallet-total-balance'>
    
    
    <div className='wallet-img-balance-wrapper' style={{paddingRight:'20px'}}>
    <div className='d-flex justify-content-center align-items-center' style={{width:'65px',height:'60px',border:`1px solid ${colors.primaryColorLighterShade}`,backgroundColor:colors.primaryColor,borderRadius:'4px'}}>
      <img src={walletWallet} style={{width:'30px',height:'25px'}}/>
    </div>
    <div>
    <div className='wallet-balance' style={{color:'#818182',fontSize:14,fontWeight:400}}>{t("TotalBalance")}</div>
    <div className='wallet-balance d-flex gap-3' style={{color:'#434345',fontSize:24,fontWeight:700}}>{allwallet?.lawyerWalletBalance}<p style={{color:`${colors.primaryColor}`}}>SAR</p></div>
    </div>
    
    
    </div>
  

    </div>

    <div className='wallet-total-balance' style={{paddingRight:'20px'}}>
    <div className='wallet-img-balance-wrapper'>
    <div className='d-flex justify-content-center align-items-center' style={{width:'65px',height:'60px',border:`1px solid ${colors.primaryColorLighterShade}`,backgroundColor:colors.primaryColor,borderRadius:'4px'}}>
      <img src={amountUpW} style={{width:'30px',height:'30px'}}/>
    </div>
    <div>
    <div className='wallet-balance' style={{color:'#818182',fontSize:14,fontWeight:400}}>{t("TotalTransfers")}</div>
    <div className='wallet-balance d-flex gap-3' style={{color:'#434345',fontSize:24,fontWeight:700}}>{allwallet?.onlyCreditedAmount}<p style={{color:`${colors.primaryColor}`}}>SAR</p></div>
    </div>
    </div>
    </div>


    </div>

    </div>
    <div className='wallet-history container-fluid mt-5' style={{width:'75vw'}}>
      <TransactionsHistory />
    </div>



    
    </div>
    </div>
  )
}

export default WalletPage