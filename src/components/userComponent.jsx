import React, { useEffect, useRef, useState } from 'react'
import colors from '../assets/constants/colors'
import { avatar, iconDownwardsArrow } from '../assets/images'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchUserDetails } from '../core/reducer/User'
import Loader from './loaders/loader'
import {  useLocation } from 'react-router-dom'
import useOutsideClick from '../hooks/useClickAnywhere'


function UserComponent(props) {

 
  const dispatch =useDispatch()
  const [userName , setUserName]=useState("User")
  const individualUserDetails =useSelector(state=>state?.user?.individualUserDetails)
  const loading = useSelector(state=>state.user.isLoading)


 const imageStyles ={ height: "auto", width: "50px", borderRadius:"50%"}
 const userNameTextStyles={margin:0 , color:colors.primaryColor , fontWeight:600 , textTransform :"capitalize",display:"flex", alignItems:"center", gap:"5px"}
 const iconStyles={height:"20px", width:"20px"}

 const location = useLocation();
 const clickOutsideUserDropdown=useRef(null)

 
 useEffect(() => {
   props.setIsVisible(false); 
  }, [location, props.setIsVisible]);
  
  const handleDropdownVisibilityClick = () => {
    props.setIsVisible((prev)=>!prev);
  };
  
  
  useOutsideClick(clickOutsideUserDropdown,()=> props.setIsVisible(false))
 
 


 useEffect(()=>{
  dispatch(fetchUserDetails());
 
 },[])

 useEffect(()=>{

  const username=`${individualUserDetails?.firstName} ${individualUserDetails?.secondName} ${individualUserDetails?.familyName}`
  setUserName(username)
},[individualUserDetails])

  return (
    <div ref={clickOutsideUserDropdown} className='d-flex flex-row justify-content-center align-items-center gap-1 h-100' >
    

        <img src={individualUserDetails?.profileImgURL || avatar} alt='User Image' style={imageStyles} />

        <div className="d-flex justify-content-center align-items-center gap-1" style={{cursor:"pointer"}} onClick={handleDropdownVisibilityClick}>
          
          <div style={userNameTextStyles} className='d-none d-md-flex' >
            <p className='m-0'>{userName}</p>
           
          </div>
         
          <img 
    src={iconDownwardsArrow} 
    alt="" 
    style={{ ...iconStyles, transform: props.isVisible ? 'rotate(-180deg)' : 'none' }}
/>


         
        </div>

        {
          loading && <Loader/>
        }

    </div>
  )
}

export default UserComponent