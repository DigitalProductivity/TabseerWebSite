import React from 'react'
import "../modal/reusableModal.css"
import ReusablePopupHeading from '../reusablePopupHeading'
import { useTranslation } from 'react-i18next'

const ReusableModal = (props) => {

  const {t}=useTranslation();
  return (
    <div className="modal-overlayss" >
    <div className="modal-contentss" style={{width:props.modalWidth || "70vw",height:props.modalHeight || "70vh",maxHeight:props.modalHeight,overflowY:"scroll"}} onClick={(e) => e.stopPropagation()}>
       {
        props.needHeading &&(
          
          <ReusablePopupHeading popupHeading={t("Session_details")} onClick={props.onClick}/>
          )
        }

        <div >
      {props.children}

        </div>
    
    </div>
  </div>
  )
}

export default ReusableModal