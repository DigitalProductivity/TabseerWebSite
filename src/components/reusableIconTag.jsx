import React from 'react'
import { calendarIcon, chatIcon, iconFile, telephoneIcon, videoCallIcon } from '../assets/images';
import { useTranslation } from 'react-i18next';

function ReusableIconTag(props) {
  let iconSrc;
  let content
  let height = "20px"
  let width = "20px"

  const {t}=useTranslation()

  if (props.interactionType === 'audio') {
    iconSrc = telephoneIcon; 
    content= t("AudioCall");
  } else if (props.interactionType === 'video') {
    iconSrc = videoCallIcon;
    content= t("VideoCall");
  }  else if (props.interactionType === 'chat') {
    iconSrc = chatIcon; 
    content= t("Chat");
   
  }
  return (
    <div >

   {   props.date &&(

        <div className='d-flex align-items-center gap-2'>
              <div className='d-flex align-items-center'>
                  <img src={calendarIcon} style={{height: "auto", width: "30px"}} />
              </div>
      
                  <p style={{fontSize:"15px", margin:0}}>{props.content}</p>
          </div>
          
      )}

      {
        props.interactionType &&(
          <div className='d-flex align-items-center gap-2'>
          <div className='d-flex align-items-center'>
              <img src={iconSrc} style={{height: "auto", width: width}} />
          </div>
  
              <p style={{fontSize:"15px", margin:0}}>{content}</p>
      </div>
        )
      }
      {
        props.files &&(
          <div className='d-flex align-items-center gap-2'>
          <div className='d-flex align-items-center'>
              <img src={iconFile} style={{height: "auto", width: width}} />
          </div>

          {
             props.files ==0||null ? (
               <p style={{fontSize:"12px", margin:0}}>0 {t("Files")}</p>
               ):(
                 <p style={{fontSize:"12px", margin:0}}>{props.fileLength || props.files} {t("Files")}</p>

            )
          }
  
      </div>
        )
      }



    </div>
  )
}

export default ReusableIconTag