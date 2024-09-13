import React from 'react'
import "../bgHolder/bgHolder.css"

const BgHolder = (props) => {
  return (
    <div className="modalOverlayMain d-flex flex-column gap-3">
    <div className="modalOverlaySub" style={{width:props.modalWidth || "60vw", maxHeight:props.maxHeight || "70vh", overflowY:"scroll"}} onClick={(e) => e.stopPropagation()}>
      

        <div>
      {props.children[0]}

        </div>
    
    </div>

    <div style={{width:"100%"}}>
      {props.children[1]}
    </div>
  </div>
  )
}

export default BgHolder