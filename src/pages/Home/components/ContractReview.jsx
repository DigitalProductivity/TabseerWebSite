import React, { useEffect, useState } from 'react';
import '../css/contractreview.css'
import { iconNullData } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../core/reducer/User';
import ReusableIconTag from '../../../components/reusableIconTag';
import ReusableTag from '../../../components/reusableTag';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


function AdminContractReview({ formattedSelectedDate }) {


  const dispatch=useDispatch()
  const orders=useSelector(state=>state.user.orders)
  const navigate =useNavigate()
 

  useEffect(()=>{
    dispatch(fetchOrders())
  },[])

  function getTimeLeft(serviceDate, serviceTime) {
    const serviceDateTimeString = `${serviceDate}T${serviceTime}`;
    const serviceDateTime = new Date(serviceDateTimeString);
    const now = new Date();
    const timeDifference = serviceDateTime.getTime() - now.getTime();
    
    if (timeDifference <= 0) {
      return "00:00:00";
    }
    
    
    const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    
    const paddedHours = String(hoursLeft).padStart(2, '0');
    const paddedMinutes = String(minutesLeft).padStart(2, '0');
    const paddedSeconds = String(secondsLeft).padStart(2, '0');
    
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }
  
  const handleNavigationClick = (id) => {

    navigate(`/requests/${id}`);
  }
  

  const {t,i18n}=useTranslation()
  
  const [isRTL,setIsRTL]=useState(false);

  useEffect(()=>{
    const isRTL=i18n.dir()==='rtl';
    setIsRTL(isRTL)
  },[i18n.dir()])
  
  const hasMatchingItem = orders?.some(item => item.serviceDate === formattedSelectedDate);

  return (
    <div className='contract-all d-flex flex-column gap-3 mt-3' style={{width:'100%',height:'550px',position:'relative',top:'20px',overflow:'scroll',scrollbarWidth:'none'}}>
      {orders?.map((item,index) => (
        item.serviceDate  === formattedSelectedDate ? (
          <div key={index} className=' d-flex flex-column gap-4' style={{border:'1px #C5C5C5 solid',width:'100%',minHeight:'21vh',borderRadius:'8px',padding:'10px', cursor:"pointer"}} onClick={()=>handleNavigationClick(item.orderId)}>

            <h6 className='text-start' style={{color:'#B48F5A',fontSize:16,fontFamily:'Roboto',fontWeight:400}}>{item?.title}</h6>

            <div className='d-flex justify-content-between'>
                <p className='m-0' style={{color:"lightgray"}}>#{item?.orderId}</p>
                <p className='m-0'>{ <ReusableTag sectorName={isRTL ? item?.sector?.sectorNameArabic : item?.sector?.sectorName } />} </p>
            </div>

  

            <div className=' d-flex justify-content-between'>

              <ReusableIconTag date={true} content={item.serviceDate}/>

              <ReusableIconTag date={false}  content={null} interactionType={item.service.serviceName} files={false}/>

              <ReusableIconTag files={true} fileLength={item.attachments}/>

            </div>

      

      

            <div className='session-time d-flex flex-row justify-content-between align-items-center' style={{borderTop:'1px solid #ECECEC',height:'5vh'}}>
              <span style={{ color:'#B48F5A',fontSize:16, fontWeight:500}}>{t("SessionStartIn")}:</span>
             
              <span style={{color:'#434345',fontSize:24,fontWeight:500}}>{getTimeLeft(item.serviceDate, item.serviceTime)}</span>
            </div>


          </div>


        ) : null
      ))}

      
      {hasMatchingItem ? null : 
      <div className='d-flex flex-column justify-content-center align-items-center h-100 review-empty'>
        <img src={iconNullData} style={{height:"auto", width:"35%"}}
        alt='image not found'
        ></img>
        <p>{t("ReviewIsEmpty")}</p>
      </div>}
    </div>
  );
}

export default AdminContractReview;
