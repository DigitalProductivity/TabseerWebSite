import React  , {useState} from 'react'
import colors from '../assets/constants/colors'
import data from "../jsonData/help.json"
import "../App.css"

function HelpPageComponent() {
    const numberOfItems = data.length
    const items = Array.from({ length: numberOfItems }, (_, index) => index + 1);

    const [expandedItems, setExpandedItems] = useState([]);

    const toggleItem = (item) => {
      setExpandedItems((prevExpandedItems) => {
        if (prevExpandedItems.includes(item)) {
          
          return prevExpandedItems.filter((expandedItem) => expandedItem !== item);
        } else {
          
          return [...prevExpandedItems, item];
        }
      });
    };

 


  return (

  <div className="container-fluid">

    <div className='helpPageMain'>
        <p style={{fontWeight:'700',fontSize:'18px'}}>Help</p>

    {
        items.map((item) => (
            <div key={item} style={{ padding: "10px 0px", borderBottom: `2px solid ${colors.secondaryColorLighterShade}` }}>
          
              <div className='d-flex flex-row justify-content-between'>
          
                <div className='d-flex flex-row gap-3 align-items-center'>
                  <p className='m-0' style={{ color: colors.primaryColor, fontSize: "20px" }}>{String(item).padStart(2, '0')}</p>
                  <p className='m-0'>An employee has been presented ? </p>
                </div>
          
                <p style={{ fontSize: "25px" }} className='m-0' onClick={() => toggleItem(item)}>{expandedItems.includes(item) ? '_' : '+'}</p>
              </div>
          
              <div 
              
              style={{ backgroundColor: "lightGray", padding: "10px 0px", marginTop: "10px", marginBottom: "10px", borderRadius: "5px" }}

              className={`${
                expandedItems.includes(item) ? '' : 'animatedUpDrag'
              } animatedDrag`}>

                <p className='m-0' id='content' style={{ padding: "10px 0px", paddingLeft: "10px" }}>Ultricies iaculis tellus aliquam sit morbi nulla. Molestie egestas in amet tempor vivamus. Morbi lectus felis tellus amet nulla etiam faucibus.</p>
              </div>
            </div>
          ))
    }


    </div>
  </div>
  )
}

export default HelpPageComponent