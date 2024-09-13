import React from "react";
import "../App.css";
import { useTranslation } from "react-i18next";

const RequestsNav = (props) => {

  const {t}=useTranslation()
  const buttons = [
    {
      "buttonName":t("ALL"),
      "buttonId": 100,
      
    },
    // {
    //   "buttonName":t("Upcoming"),
    //   "buttonId":0 ,
      
    // },
    {
      "buttonName":t("Approved"),
      "buttonId":1 ,
      
    },
    {
      "buttonName":t("Commented"),
      "buttonId":2 ,
      
    },
    {
      "buttonName":t("Completed"),
      "buttonId":4,
      
    },
    {
      "buttonName":t("Expired"),
      "buttonId":5,
      
    },
    {
      "buttonName":"Cancelled",
      "buttonId":3,
      
    },

  ];



  

  return (

    <div className="container-fluid">
       

       <div className="d-flex justify-content-md-between gap-sm-3" style={{ overflowX: 'scroll', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
    {buttons.map((item, index) => (
        <div key={index} className={`d-flex align-items-center${props.activeButton === item.buttonId ? " activeButton" : ''}`} style={{ cursor: "pointer", flex: '0 0 auto' }} onClick={() => props.setActiveButton(item.buttonId)}>
            <div className="mr-sm-3">
                {item.buttonName}
            </div>
        </div>
    ))}
</div>


    </div>
  );
};

export default RequestsNav;
