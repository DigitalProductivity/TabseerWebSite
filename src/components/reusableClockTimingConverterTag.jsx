import React from 'react'

const ReusableClockTimingConverterTag = (props) => {

    if(props.time){
        const [hours, minutes, seconds] = (props.time)?.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; 
    
        const formattedTime = [
          hours12.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
        ].join(':') + ' ' + period;
        return formattedTime;

    }
 
}

export default ReusableClockTimingConverterTag