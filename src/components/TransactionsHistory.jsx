import React, { useState,useEffect } from 'react';
import '../components/transactionhistory.css';
import TransactionFull from '../components/TransactionFull';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory } from '../core/reducer/User';
import {  iconNullData } from '../assets/images';
import DateFormatter from './dateFormatter';
import { useTranslation } from 'react-i18next';



const TransactionsHistory = () => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const dispatch = useDispatch();
  const histroy=useSelector(state=> state.user.fetchTransactionHistory)

  const handleSeeAllClick = () => {
    setShowAllTransactions(!showAllTransactions);
  };
  
  useEffect(() => {
  
    dispatch(fetchTransactionHistory());
  }, []);

  const {t}=useTranslation()
  return (
    <div className='trans-main-container container-fluid'>
      <div className='d-flex  justify-content-between align-items-center'>
        <h5 style={{padding:"15px 0px",fontSize:'18px',fontWeight:'700'}}>{t("Transactionshistory")}</h5>
        <span
          style={{ textDecoration: 'underLine', color: '#B48F5A', cursor: 'pointer' }}
          onClick={handleSeeAllClick}
        >
          {t("SeeAll")}
        </span>
      </div>

      {showAllTransactions ? (
        <TransactionFull
          onClose={() => setShowAllTransactions(false)}
          histroy={histroy}
        />
       
      ) : (
        histroy?.length === 0 ? (
          <div className='no-data'>
            <img src={iconNullData} width={100} height={100} alt='image not found' />
            <p style={{ color: '#B48F5A', fontSize: 16, fontWeight: 400 }}>{t("TheresNoTransactions")}</p>
          </div>
        ) : (
          histroy?.slice(0, 5).map((item, index) => (
            <div className='sts-all' key={index}>
              <div className='status-date'>
                <div className='case'>{item.title}</div>
                <div className='date'><DateFormatter date={item.createdDate}/></div>
              </div>
              <div className='sar'>{item.amount}</div>
            </div>
          ))
        )
      )}
    </div>
    
  );
};




export default TransactionsHistory;
