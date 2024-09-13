import React, { useState, useEffect } from 'react';
import colors from '../assets/constants/colors';
import { iconDeleteXMark } from '../assets/images';

const ReusableTooltip = ({ text, isDisabled , onTextClick , onDeleteClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };



  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div className='d-flex flex-row gap-2'>
        {text.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            className="d-flex flex-row gap-3"
            style={{
              backgroundColor: colors.primaryColorLighterShade,
              borderRadius: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
              position: 'relative' 
            }}
          >
            <div className="d-flex flex-row" onClick={onTextClick}>
              {item.length > 10 ? `${item.substring(0, 10)}...` : item}
            </div>
            {!isDisabled && (
              <div className="d-flex flex-row justify-content-center align-items-center">
                <img
                  src={iconDeleteXMark}
                  style={{ height: 'auto', width: '15px', cursor: 'pointer' }}
                  alt="Delete"
                  onClick={(e) => onDeleteClick(index , e)} 
                />
              </div>
            )}
            {hoveredIndex === index && (
              <div className="d-flex flex-row justify-content-center align-items-center" style={{ position: 'absolute', left: 0,zIndex:1 , transform: 'translateY(-120%)', backgroundColor: colors.primaryColorLighterShade, padding: '5px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                <span>{item}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableTooltip;
