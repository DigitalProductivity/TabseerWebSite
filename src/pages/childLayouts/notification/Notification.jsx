import React, { useEffect, useState } from 'react'
import ReusableNotificationDisplay from '../../../components/reusableNotificationDisplay'
import { iconChat, iconClaimsMgmtNormal, iconSessionMgmtNormal, iconUserMgmtNormal, iconWalletNormal } from '../../../assets/images'
import ReusableNotificationDescriber from '../../../components/reusableNotificationDescriber'

const Notification = () => {
    const [showDescriber , setShowDescriber]=useState(false)
    const[splicedItem,setSplicedItem]=useState([])
    
    const notificationData =[
        {   id:1,
            imageSource:iconWalletNormal,
            notificationHeading:"payment",
            notificationPara:"Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option.",
            time:"10:00 AM"
        },
        {
            id:2,
            imageSource:iconUserMgmtNormal,
            notificationHeading:"Request",
            notificationPara:"Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option.",
            time:"10:00 AM"
        },
        {
            id:3,
            imageSource:iconSessionMgmtNormal,
            notificationHeading:"Profile",
            notificationPara:"Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option, Bankruptcy and Debt Relief Option.",
            time:"10:00 AM"
        },
    ]

    const handleDescriberVisibilityClick = (id) => {
        if (id) {
            const index = notificationData.findIndex((item) => item.id === id);
    
            if (index !== -1) {
                const dataToBeSpliced = [...notificationData];
                const [item] = dataToBeSpliced.splice(index, 1);
                
               
                setSplicedItem(item);
            } else {
                return;
            }
        }
    };
    



    const handleCancelClick = () =>{
        setShowDescriber(false)
    }

    useEffect(()=>{

        if(splicedItem.length!==0){
            // console.log(splicedItem)
            setShowDescriber(true)
        }
    },[splicedItem])

  return (
    <div>
        <h6 className='mb-3'>Notifications</h6>

        <div className="row">
            <div className="col-lg-12">
                {
notificationData?.map((item)=>(
    <div className='mb-3' key={item?.id} style={{cursor:"pointer"}}>
        <ReusableNotificationDisplay imageSource={item.imageSource} notificationHeading={item.notificationHeading} notificationPara={item.notificationPara} time={item.time} onClick={()=>handleDescriberVisibilityClick(item.id)}/>
        </div>
))
                }
            </div>
        </div>   

        <div className="row">

                <h6 className='mb-3'>Latest</h6>

                <div className="col-lg-12">
                {
notificationData?.map((item)=>(
    <div className='mb-3'>
        <ReusableNotificationDisplay imageSource={item.imageSource} notificationHeading={item.notificationHeading} notificationPara={item.notificationPara} time={item.time}/>
        </div>
))
                }
            </div>
        </div> 

          {
            showDescriber && (
                <ReusableNotificationDescriber onClick={handleCancelClick} time={splicedItem?.time} displayContents={splicedItem?.notificationPara}/>
            )
        }    
    </div>
  )
}

export default Notification