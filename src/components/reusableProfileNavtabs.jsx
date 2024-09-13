import React from 'react'
import "../components/components.css"

const ReusableProfileNavtabs = (props) => {


    const activeClass = props.isActive ? 'active-tab' : '';
  return (
    <div style={{width:"150px", boxShadow:" 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", cursor:"pointer", boxShadow:"none", borderRadius:"5px"}} onClick={props.onClick}  className={`d-flex flex-row justify-content-center align-items-center ${activeClass}`}>
        <p className='m-0' style={{padding:"10px 10px"}}>{props.heading}</p>
    </div>
  )
}

export default ReusableProfileNavtabs