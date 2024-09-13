import React, { useEffect, useState } from 'react'
import colors from '../../../assets/constants/colors'



function Sectors(props) {

  let color=""
  let backgroundColor=""
  let statusColor=""
  let statusBackgroundColor=""
  let text =""


    switch (props.typeOfSector || null) {
    
          case 1:
            backgroundColor=colors.primaryColor,
            color ="white",
            text = "Personal status"
            break;
          case 2:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Commercial"
            break;
          case 3:
            backgroundColor=colors.primaryColor,
            color ="white",
            text ="Crime"
            break;
          case 4:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Medical malpractice"
            break;
          case 5:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Traffic"
            break;
          case 6:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Startup companies"
            break;
          case 7:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Administrative"
            break;
          case 8:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Labour"
            break;
          case 9:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Rights"
            break;
          case 10:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Transport, maritime and air shipping"
            break;
          case 11:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Inheritance liquidation"
            break;
          case 12:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Real state"
            break;
          case 13:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Scam"
            break;
          case 14:
            backgroundColor=colors.primaryColor,
            color ="white",
            text="Judicial enforcement suspension of services"
            break;

          default:
            
            
            break;
        }
      
    const [fontSize, setFontSize] = useState(14);
    const [width, setWidth] = useState('100px'); 
    
    useEffect(() => {
      if (text.length > 10) {
        setFontSize(14);
        setWidth('150px');
      } else {
        setFontSize(14); 
        setWidth('100px');
      }
    }, [text]);
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"30px", width: width ,backgroundColor:backgroundColor,borderRadius:"5px" }}>
     <p style={{ color: color, padding: "15px 10px", margin: 0, fontSize: `${fontSize}px`, textTransform: "capitalize" }}>
      {text}
    </p>
</div>
  )
}

export default Sectors