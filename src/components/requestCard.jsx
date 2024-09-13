import React from 'react'
import images from '../assets/constants/images'
import ReusableTag from './reusableTag'
import { useNavigate } from 'react-router-dom';
import ReusableIconTag from './reusableIconTag'
import "../App.css"
import colors from '../assets/constants/colors';
import ReusableNullData from './reusableNullData';
import { rightArrowSecondaryColorLightShade } from '../assets/images';
import { useTranslation } from 'react-i18next';




function RequestCard(props) {


  const navigate = useNavigate();

  const handleClick = (id) => {
  
    navigate(`/requests/${id}`);
  };


 
  const {t}=useTranslation();

  return (

    <div className="container-fluid">
      <div className='row'>
    
        {

          props.dataValues?.length == 0 ? <ReusableNullData height={"68vh"} nullImageWidth={"30%"} nullMessage={t("NoDataAvailable")}/>:
         props.dataValues?.map((item , index) => (

           <div key={index+1} className="col-lg-6 col-md-6 col-sm-12" onClick={() => handleClick(item.orderId)} style={{textDecoration:"none", cursor:"pointer", color:"black"}} >

            <div className="row ">

              <div className=' p-3 ' style={{border:"2px solid #ececec",borderRadius:"5px",height:"80%", width:"98%", marginBottom:"13px"}}>

                <div className="d-flex flex-column gap-3">

                      <div className='d-flex flex-row justify-content-between '>
                        <h6 className='m-0' >{item.title}</h6>
                        <img src={rightArrowSecondaryColorLightShade} style={{height: "auto", width: "20px"}} />
                      </div>
                      <p className='m-0' style={{color:colors.secondaryColor}}>#{item.orderId}</p>

                      <div className='row'>

                        <div className="col-lg-4 col-4">
                        <ReusableIconTag date={true}  content={item.serviceDate} interactionType={false} files={false}/>

                        </div>

                        <div className="col-lg-4 col-4">

                        <ReusableIconTag date={false}  content={null} interactionType={item.service.serviceName} files={false}/>
                        </div>

                        <div className="col-lg-4 col-4">
                        <ReusableIconTag date={false}  content={null} interactionType={false} files={`${item.attachments} `}/>

                        </div>

                      </div>
                      <div className='d-flex flex-row gap-3'>
                        <ReusableTag typeOfUser={item.clientType} status={null} />
                        <ReusableTag typeOfUser={null} status={item.orderStatus} />
                      </div>
                </div>


              </div>

            </div>

          </div>
          ))
      }
      </div>

    </div>

  )
}

export default RequestCard