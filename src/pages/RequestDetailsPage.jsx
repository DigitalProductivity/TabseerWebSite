import React, { useEffect } from 'react'
import RequestDetailsCard from "../components/requestDetailsCard";
import "../App.css"
import { useSelector } from 'react-redux';

function RequestDetailsPage() {

  const orderStatusUpdationCode =useSelector((state)=>state?.user?.orderStatusUpdationCode)

  useEffect(()=>{

    console.log(
      orderStatusUpdationCode
    )

  },[orderStatusUpdationCode])

  
  return (
    <div className="container-fluid">
    
            <p>Request Details</p>

            <RequestDetailsCard/>

    </div>



 
  )
}

export default RequestDetailsPage