import React, { useEffect,useState } from 'react';
import '../css/HomePageChart.css'
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer,Layer } from 'recharts';


function HomePageChart(props) {


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label" style={{backgroundColor:'white',width:'100%',fontWeight:'700',fontSize:'12px'}}>{`${label} : SAR ${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
      <BarChart
        width={850}
        height={330}
        data={props.dataWithSAR} 
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={60}
      >
      
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <Tooltip content={<CustomTooltip />} />
      

       <Bar
          dataKey="pv"
          fill="#B48F5A"
          background={{ fill: ' #F8F4EF' }}
          shape={
            ({ payload, x, y, width, height }) => (
              <rect
                rx={3}
                ry={3}
                width={width}
                height={height}
                x={x}
                y={y}
                fill={'#B48F5A'}
              />
            )
          }
          
        />
      </BarChart>
  );
}

export default HomePageChart;
