import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import colors from "../assets/constants/colors";
import ReusableTag from "./reusableTag";
import { useDispatch, useSelector } from "react-redux";
import "../App.css"
import { fetchSessionDetails } from "../core/reducer/User";
import useWindowDimensions from "../hooks/useWindowDimensions";
import ReusableIconTag from "./reusableIconTag";
import Loader from "./loaders/loader";
import ReusableContentEncloser from "./reusableContentEncloser";
import { useTranslation } from "react-i18next";
import ReusableTextButton from "./reusableTextButton";
import PopUp from "./popUp";
import { avatar, iconNullData, starIcon } from "../assets/images";
import ReusableMessagePopper from "./utils/popper/reusableMessagePopper";


function RequestDetailsCard() {
  let { id } = useParams();
  const loading = useSelector(state=>state?.user?.isLoading)
  const sessionDetails= useSelector(state=>state.user.fetchSessionDetailsVal)
  const [matchData, setMatchData] = useState(null);
  const dispatch = useDispatch()
  const {width , height}=useWindowDimensions()
  const[commentContainer , setCommentContainer]=useState(false)
  const [showButton, setShowButton] = useState(false);
  const [enabler,setEnabler]=useState(false)
  const orderStatusUpdationCode =useSelector((state)=>state?.user?.orderStatusUpdationCode)

  const navigate = useNavigate();

  const StarRating = ({ rating }) => {
       
    return Array.from({ length: rating }, (_, index) => (
      <span key={index}><img src={starIcon}  style={{height:"auto",width:"20px"}}/></span>
    ));
  }

  const handleClick = (id) => {
    if(matchData.serviceType==1){
      navigate(`/chat/${id}`)
      
    }else{
      navigate(`/interactionChannel/${id}`);

    }
  
  };

  const handleCommentContainerVisibilityClick = () =>{
    setCommentContainer(true)
  }

  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
      clearInterval(intervalId);  
      if (dateInput && timeInput) {
          updateTimer();
      }
      return () => clearInterval(intervalId);  
  }, [dateInput, timeInput]);

  const updateTimer = () => {
      const endTime = parseDateTimeInput(dateInput, timeInput);
      if (!endTime) {
          setTimeLeft('Invalid date/time format');
          return;
      }

   
      const now = new Date();
      if (endTime <= now) {
          setTimeLeft("00:00:00");
          return;
      }

      const id = setInterval(() => {
          const now = new Date();
          const diff = endTime - now;

          if (diff <= 0) {
              clearInterval(id);
              setTimeLeft("00:00:00");
          } else {
              const hours = Math.floor(diff / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
          }
      }, 1000);

      setIntervalId(id);
  };

  const parseDateTimeInput = (date, time) => {
      const [year, month, day] = date.split('-').map(Number);
      const timePattern = /(\d{1,2}):(\d{2})\s?(AM|PM)/i;
      const matches = time.match(timePattern);
      if (!matches) {
          return null;
      }

      let [ , hours, minutes, period ] = matches;
      hours = parseInt(hours);
      minutes = parseInt(minutes);

      if (period.toUpperCase() === 'PM' && hours !== 12) {
          hours += 12;
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
          hours = 0;
      }

      const endTime = new Date(year, month - 1, day, hours, minutes, 0);
      return endTime;
  };

  const pad = (num) => num.toString().padStart(2, '0');


  useEffect(()=>{
    setMatchData(sessionDetails)
    setTimeInput(sessionDetails?.time)
    setDateInput(sessionDetails?.date)
   
  },[sessionDetails])


 
  
  

  useEffect(() => {

    if(sessionDetails){

      const checkAndUpdateButtonState = () => {
          const apiDate = sessionDetails?.date;
          const apiTime = sessionDetails?.time;
  
        
          const apiFormattedDate = apiDate;
  
  
          const [time, period] = apiTime?.split(' ');
          const [hours, minutes] = time?.split(':').map(Number);
          const adjustedHours = period === 'PM' ? hours + 12 : hours;
          const apiTimeInMinutes = adjustedHours * 60 + minutes;
  
     
          const currentDate = new Date();
          const currentFormattedDate = currentDate?.toISOString().split('T')[0];
          const currentFormattedTime = currentDate?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 
          
          const currentTimeInMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
          
  
          const isButtonEnabled = (apiFormattedDate === currentFormattedDate && 
                                  (currentTimeInMinutes + 10) >= apiTimeInMinutes);
                                  const useEffectEnabler = (apiFormattedDate === currentFormattedDate && 
                                    currentTimeInMinutes === apiTimeInMinutes);
  
          setShowButton(isButtonEnabled);
          setEnabler(useEffectEnabler)
      };
  
      checkAndUpdateButtonState();
  
      const intervalId = setInterval(checkAndUpdateButtonState, 6000);
  
      return () => clearInterval(intervalId);
    }else{
      return
    }
}, [sessionDetails]);

useEffect(() => {
  if (enabler) {
      // console.log("true");

   
      const timerId = setTimeout(() => {
      
          // console.log("API call after 30 minutes");
         
      }, 30 * 60 * 1000); 

      
      return () => clearTimeout(timerId);
  } else {
      // console.log("false");
      return
  }
}, [enabler]);


 
useEffect(()=>{
 const  val= Number(id)
  dispatch(fetchSessionDetails({  orderId:val }))
},[ ])


const {t}=useTranslation()
  return (
    <>
    
    {
      loading && <Loader/>
    }
    <p style={{fontWeight:'700',fontSize:'18px'}}>{t("RequestDetails")}</p>
    
    <div style={{height:height}}>

      {matchData ? (
        <div
          key={matchData.orderId}
        
          className="h-100 d-flex flex-column align-items-center gap-4">

          <div  className=" p-3 widthDetailedCardsControl" style={{border: `2px solid ${colors.secondaryColorLighterShade}`}}>
{
  (matchData?.status==1 || matchData?.status==2)&&(
            <div className="mb-3 d-flex justify-content-between" style={{background:colors.primaryColorLighterShade, padding:"15px", borderRadius:"5px"}}>

                  <div className="d-flex justify-content-center align-items-center">
                    <p className="m-0" style={{fontSize:"16px", color:colors.primaryColor}}>{t("SessionStartIn")}:</p>
                  </div>

                  <p className="m-0" style={{fontSize:"25px"}}>{timeLeft}</p>

            </div>

  )
}

            <div className="d-flex flex-column gap-3" style={{ width: "100%" }}>
                <h6>{matchData.title}</h6>

                <div className="d-flex justify-content-between">
                    <p className="m-0"># {matchData.orderId}</p>

                    <div className="d-flex gap-2">
                      <ReusableTag typeOfUser={matchData.clientType} status={null} />
                      <ReusableTag typeOfUser={null} status={matchData.status} />
                    </div>
                </div>

                <div className="d-flex justify-content-between flex-wrap" style={{ width: "100%" }} >

                  <div className="d-flex flex-column gap-2">
                    <p className="m-0" style={{ color: "gray" }}>
                      {t("Date")}
                    </p>
                    <p className="m-0">{matchData.date}</p>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <p className="m-0" style={{ color: "gray" }}>
                      {t("Time")}
                    </p>
                    <p className="m-0">{matchData.time}</p>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <p className="m-0" style={{ color: "gray" }}>
                      {t("Price")}
                    </p>
                    <p className="m-0">{matchData.fees} SAR</p>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <p className="m-0" style={{ color: "gray" }}>
                      {t("Type")}
                    </p>
                    <p className="m-0">{ <ReusableIconTag date={false}  content={null} interactionType={matchData.serviceName} files={false}/>}</p>
                  </div>

                  <div className="d-flex flex-column gap-2">
                    <p className="m-0" style={{ color: "gray" }}>
                      {t("Client")}
                    </p>
                    <p className="m-0">{matchData.clientName}</p>
                  </div>

                

                  <div className="d-flex flex-column gap-2">
                    <p className="m-0" style={{ color: "gray" }}>
                      {t("Attachment")}
                    </p>
                    <p className="m-0">{ `${matchData.attachments.length} ${t("Files")}`}</p>
                  </div>

                </div>

                <div className="d-flex flex-column gap-2 flex-wrap">

                  <p className="m-0" style={{ color: colors.secondaryColor }}>
                    {t("Description")}
                  </p>

                  <p className="m-0" style={{ backgroundColor:colors.secondaryColorLighterShade,padding: "15px", borderRadius: "5px"}}>
                    {matchData.description}
                  </p>

                </div>

                 

                                  <>
                                    <p className="m-0">{t("Attachments")}</p>

                                  
                                      <div  className="row">
                            { matchData.attachments?.length== 0 ?(
                              <div className="d-flex flex-column gap-2 align-items-center justify-content-center w-100">
                              <img src={iconNullData} style={{height:"auto", width:"100px"}}/>
                              <p>{t("NoData")}</p>
                              </div>)
                            : matchData.attachments?.map((item , index)=>(
                                <div className="col-lg-4 mb-3">

                                <ReusableContentEncloser fileType={item.type} fileName={item.name} fileLink={item.url}/>
                                </div>
                              
                              
                              ))}
                              </div>

                                  </>

            </div>
              

                              {
                                matchData.status == 2 &&  
                                <div>

                                <p>{t("Comment_by_lawyer")}</p>
                                <div style={{backgroundColor:"#fcedeb", width:"100%"}}>
                    
                                  <p style={{ backgroundColor: "lightGray", color: "black", borderRadius:"5px" }} className="p-3 ">
                                    {matchData.LawyerNotes}
                                  </p>
                                </div>
                              </div>
                              }

<>
{
  matchData?.status==4 &&(

        (matchData?.rating && Object.keys(matchData.rating).length !== 0)
    ? (
          <div>
            <p>{t("Session_rating")}</p>
            <div className="d-flex flex-column gap-4" style={{ background: colors.secondaryColorLighterShade, borderRadius: "5px", padding: "15px 10px" }}>
    
              <div className="d-flex flex-row gap-2">
    
                <div className="d-flex justify-content-center align-items-center">
                  <img src={matchData.rating.profile || avatar} style={{ height: "auto", width: "50px", borderRadius: "50%" }}  />
                </div>
    
                <div className="d-flex flex-column gap-2">
    
                  <p className="m-0">{matchData?.rating?.clientName}</p>
    
                  <div>
                    <StarRating rating={matchData?.rating?.rating || "1" } />
                  </div>
    
                </div>
    
              </div>
    
              <div className="d-flex justify-content-start" style={{ paddingLeft: "10px" }}>
    
                <p className="m-0" style={{ color: colors.secondaryColor, paddingBottom: "10px" }}>
                  {matchData?.rating?.message}
                </p>
    
              </div>
    
            </div>
    
          </div>
        ) :
    
        <div>
          <p>{t("Session_rating")}</p>
          <div style={{ padding:"10px", borderRadius:"10px"}} className="d-flex flex-column gap-2 justify-content-center align-items-center">
          <img src={iconNullData} style={{height:"auto", width:"100px"}} />
          <p className="m-0">{t("No_rating")}</p>
    
          </div>
        </div>
        
    
  )
}

</>


                            
                            </div>
                    <div className="d-flex gap-3">


<>
                            {
                                matchData.status == 1 &&  
                                <div className="d-flex justify-content-center gap-3">

                                <ReusableTextButton backgroundColor={colors.primaryColor} color={"white"} buttonName={t("Comment")} buttonWidth={"150px"} onClick={handleCommentContainerVisibilityClick}/>
                            
                    
                              </div>
                              }

</>

<>
                            {
                              (matchData.status == 1 || matchData.status ==2) && showButton ? (
                                <div className="d-flex justify-content-center gap-3">
                                <button onClick={() => handleClick(matchData.orderId)} style={{color:"white", backgroundColor:colors.primaryColor, border:"none",padding:"10px 30px", borderRadius:"5px"}}>{t("Start_Session")}</button>
                    
                              </div>

                                ) :""
                              }

</>


                       

                    </div>
{
  commentContainer && (

    <PopUp  onClick={()=>setCommentContainer(false)} id={id}/>
  )
}

{
  orderStatusUpdationCode?.status?.code==1000 &&(
    <ReusableMessagePopper message={t("Comment_has_been_added_successfully")}/>
  )
}



        </div>
      ) : (
        <div>{t("Loading")}...</div>
      )}
    </div>
    </>
  );
}

export default RequestDetailsCard;
